# Flow.js
A Webhook-featured workflow automation framework.

## Samples

### Initialize the Flow and Team object instances
```js
var flowjs = require('node-flowjs');
var flow = new flowjs.Flow(); // It helps create automation workflows.
var team = new flowjs.Team(); // It helps get team members information.
```

### Create a workflow for employees to apply for expenditure

#### Version 1
```js
flow.setup('/expenditure-application-workflow')
    .if(data => { return data.fromEmail === data.applicantEmail })
      .mail(team.findManager(data.fromEmail).email, './ask-approval.html')
    .if(data => { return data.fromEmail != 'director@samples.com' && data.approved })
      .mail(team.findManager(data.fromEmail).email, './ask-approval.html')
    .if(data => { return data.fromEmail === 'director@samples.com' && data.approved })
      .mail(data.applicantEmail, './got-approval.html')
      .mail('secretary@samples.com', './got-approval.html');
```

#### Version 2
```js
flow.setup('/expenditure-application-workflow', (data) => {
  if (data.fromEmail === data.applicantEmail) {
    flow.mail(team.findManager(data.fromEmail).email, './ask-approval.html');
  }
  if (data.fromEmail != 'director@samples.com' && data.approved) {
    flow.mail(team.findManager(data.fromEmail).email, './ask-approval.html');
  }
  if (data.fromEmail === 'director@samples.com' && data.approved) {
    flow.mail(data.applicantEmail, './got-approval.html')
    flow.mail('secretary@samples.com', './got-approval.html');
  }
});
```

#### Version 3
```xml
<flow setup="expenditure-application-workflow">
  <if condition="${data.fromEmail === data.applicantEmail}">
    <mail to="${findManager(data.fromEmail).email}" subject="Ask for The Approval" content="./ask-approval.html" />
  </if>
  <if condition="${data.fromEmail != 'director@samples.com' && data.approved}">
    <mail to="${findManager(data.fromEmail).email}" subject="Ask for The Approval" content="./ask-approval.html" />
  </if>
  <if condition="${data.fromEmail === 'director@samples.com' && data.approved}">
    <mail to="${data.applicantEmail}" subject="Got The Approval" content="./got-approval.html" />
    <mail to="secretary@samples.com"  subject="Got The Approval" content="./got-approval.html" />
  </if>
</flow>
```
