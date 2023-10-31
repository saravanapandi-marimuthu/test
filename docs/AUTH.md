# Third Party Authentication

## Microsoft
Ensure that you create an app under App Registration in the primary Azure directory.
Pick the following option for Supported Account Types:


 >__Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)__

Enter the following Redirect URL:

```
https://horizenag.b2clogin.com/horizenag.onmicrosoft.com/oauth2/authresp
```

Create a client secret under Certificates & Secrets

__NOTE__: _You will need to recreate the secret before the previous one expires._


## Google



## Apple



## Facebook