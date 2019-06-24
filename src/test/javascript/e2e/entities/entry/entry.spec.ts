/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EntryComponentsPage, EntryDeleteDialog, EntryUpdatePage } from './entry.page-object';

const expect = chai.expect;

describe('Entry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let entryUpdatePage: EntryUpdatePage;
  let entryComponentsPage: EntryComponentsPage;
  let entryDeleteDialog: EntryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Entries', async () => {
    await navBarPage.goToEntity('entry');
    entryComponentsPage = new EntryComponentsPage();
    await browser.wait(ec.visibilityOf(entryComponentsPage.title), 5000);
    expect(await entryComponentsPage.getTitle()).to.eq('blogApp.entry.home.title');
  });

  it('should load create Entry page', async () => {
    await entryComponentsPage.clickOnCreateButton();
    entryUpdatePage = new EntryUpdatePage();
    expect(await entryUpdatePage.getPageTitle()).to.eq('blogApp.entry.home.createOrEditLabel');
    await entryUpdatePage.cancel();
  });

  it('should create and save Entries', async () => {
    const nbButtonsBeforeCreate = await entryComponentsPage.countDeleteButtons();

    await entryComponentsPage.clickOnCreateButton();
    await promise.all([
      entryUpdatePage.setTitleInput('title'),
      entryUpdatePage.setContentInput('content'),
      entryUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      entryUpdatePage.blogSelectLastOption()
      // entryUpdatePage.tagSelectLastOption(),
    ]);
    expect(await entryUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await entryUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await entryUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    await entryUpdatePage.save();
    expect(await entryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await entryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Entry', async () => {
    const nbButtonsBeforeDelete = await entryComponentsPage.countDeleteButtons();
    await entryComponentsPage.clickOnLastDeleteButton();

    entryDeleteDialog = new EntryDeleteDialog();
    expect(await entryDeleteDialog.getDialogTitle()).to.eq('blogApp.entry.delete.question');
    await entryDeleteDialog.clickOnConfirmButton();

    expect(await entryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
