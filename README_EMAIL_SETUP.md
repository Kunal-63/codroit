# Email Setup Instructions

## SMTP Configuration

To enable email functionality, you need to set up environment variables for SMTP.

### For Gmail:

1. **Enable 2-Step Verification** on your Google account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Set Environment Variables**:

   **Windows (PowerShell):**
   ```powershell
   $env:SMTP_SERVER="smtp.gmail.com"
   $env:SMTP_PORT="587"
   $env:SMTP_USERNAME="your-email@gmail.com"
   $env:SMTP_PASSWORD="your-app-password"
   $env:COMPANY_EMAIL="info@codroit.in"
   ```

   **Windows (Command Prompt):**
   ```cmd
   set SMTP_SERVER=smtp.gmail.com
   set SMTP_PORT=587
   set SMTP_USERNAME=your-email@gmail.com
   set SMTP_PASSWORD=your-app-password
   set COMPANY_EMAIL=info@codroit.in
   ```

   **Linux/Mac:**
   ```bash
   export SMTP_SERVER="smtp.gmail.com"
   export SMTP_PORT="587"
   export SMTP_USERNAME="your-email@gmail.com"
   export SMTP_PASSWORD="your-app-password"
   export COMPANY_EMAIL="info@codroit.in"
   ```

### For Other Email Providers:

- **Outlook/Hotmail**: `smtp-mail.outlook.com`, port `587`
- **Yahoo**: `smtp.mail.yahoo.com`, port `587`
- **Custom SMTP**: Use your provider's SMTP settings

### Testing

After setting up, test the contact form. You should receive:
1. An email at the company email address with the form submission
2. A confirmation email sent to the form submitter

### Security Note

Never commit your `.env` file or hardcode credentials. Always use environment variables.


