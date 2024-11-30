FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /TaxieBookingApp

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /TaxieBookingApp

COPY --from=build /TaxieBookingApp/target/TaxiBookingApp-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]