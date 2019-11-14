# Notify

Used to notify when Terun done your work.

```js
// terun.js
const Notify = require("@terun/plugin-notify")

const NotifyInstance = new Notify({
    // Optional params
    title:"Terun done",
    message:"A message example"
})

// ... your terun config
```