package com.project.taxibookingapp.services;

public interface EmailSenderService {
    public void sendEmail(String toEmail, String subject, String Body);
}
