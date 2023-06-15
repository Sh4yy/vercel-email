<div align="center">
	<img src="https://github.com/Sh4yy/cloudflare-email/assets/23535123/36a28753-7ded-45ef-bfed-fcc308658b33" alt="Vercel Email Sender"/>
	<br>
  <h1>Vercel Edge Emails</h1>
	<p>Send free transactional emails from your Vercel edge functions through Cloudflare and MailChannels</p>
</div>

## How it works

This package only works with Vercel edge functions. Vercel edge functions are serverless functions that run on the edge of the Cloudflare network. Thus, we can take advantage of Cloudflare's free outbound email service which is a result of their partnership with MailChannels. To learn more, visit the [Cloudflare blog post](https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/).

## Getting Started!

### Install the package
```bash
npm install vercel-email
```

### Create a new edge function

```typescript
import { NextRequest, NextResponse } from 'next/server';
 
export const config = {
  runtime: 'edge', // this is a pre-requisite
};
```

### Import the package
```typescript
import Email from 'vercel-email'
```

## Setup SPF

SPF is a DNS record that helps prevent email spoofing. You will need to add an SPF record to your domain to allow MailChannels to send emails on your behalf.

1. Add a `TXT` record to your domain with the following values:
   - Name: `@`
   - Value: `v=spf1 a mx include:relay.mailchannels.net ~all`

## Setup DKIM

This step is optional, but highly recommended. DKIM is a DNS record that helps prevent email spoofing. You may follow the steps listed in the [MailChannels documentation](https://support.mailchannels.com/hc/en-us/articles/7122849237389-Adding-a-DKIM-Signature) to set up DKIM for your domain.

## Usage

### Basic Email

The Most basic request would look like this:

```typescript
await Email.send({
  to: "john@example.com",
  from: "me@example.com",
  subject: "Hello World",
  text: "Hello World"
})
```

### HTML Emails

You can also send HTML emails by adding an `html` parameter to the request. This can be used in conjunction with the `text` parameter to send a multi-part email.

```typescript
await Email.send({
  to: "john@example.com",
  from: "me@example.com",
  subject: "Hello World",
  html: "<h1>Hello World</h1>"
})
```

### Sender and Recipient Name

You can also specify a sender and recipient name by adding a `name` parameter to the request. This can be used for both the `to` and `from` parameters.

```typescript
await Email.send({
  to: { "email": "john@example.com",  "name": "John Doe" },
  from: { "email": "me@example.com", "name": "Jane Doe" },
  subject: "Hello World",
  text: "Hello World"
})
```

### Sending to Multiple Recipients

You may also send to multiple recipients by passing an array of eamils, or an array of objects with `email` and `name` properties.

```typescript
await Email.send({
  "to": [
    "john@example.com",
    "rose@example.com"
  ],
  "from": "me@example.com",
  "subject": "Hello World",
  "text": "Hello World"
})
```

or

```typescript
await Email.send({
  "to": [
    { "email": "john@example.com", "name": "John Doe" },
    { "email": "rose@example.com", "name": "Rose Doe" }
  ],
  "from": "me@example.com",
  "subject": "Hello World",
  "text": "Hello World"
})
```

### Sending BCC and CC

You can also send BCC and CC emails by passing an array of eamils, an object with `email` and `name` properties, or an array of either, similar to the `to` parameter.

```typescript
await Email.send({
  "to": "john@example.com",
  "from": "me@example.com",
  "subject": "Hello World",
  "text": "Hello World",
  "cc": [
    "jim@example.com",
    "rose@example.com"
  ],
  "bcc": [
    "gil@example.com"
  ]
})
```

### Reply To

You can also specify a reply to email address by adding a `replyTo` parameter to the request. Again, you can use an email string, an object with `email` and `name` properties, or an array of either.

```typescript
await Email.send({
  "to": "john@example.com",
  "from": "me@example.com",
  "replyTo": "support@example.com",
  "subject": "Hello World",
  "text": "Hello World"
})
```