web: java $JAVA_OPTS -Xmx256m -jar target/*.jar --spring.profiles.active=prod,heroku,no-liquibase --server.port=$PORT 
release: cp -R src/main/resources/config config && ./mvnw liquibase:update -Pprod,heroku
