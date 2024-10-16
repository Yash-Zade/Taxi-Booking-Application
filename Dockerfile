
FROM openjdk:17-jdk-alpine

WORKDIR /app


COPY target/TaxiBookingApp-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar /app/app.jar"]
