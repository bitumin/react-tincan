# React TinCanJS

This package provides a React high level wrapper
for the tincanjs library using Context and hooks.

## How to use

Install the package 

`npm install react-tincan`

Import the TinCan Context Provider, for example:

```
import { TinCanProvider } from 'react-tincan';

// ...

ReactDOM.render(
    <TinCanProvider>
        <App />
    </TinCanProvider>,
    document.getElementById('root')
);
```

Now you can send xAPI Statement from your child components like so:

```
import { useTinCan } from "react-tincan";

// ...

export default function MyFunctionalComponent() {
    const { saveCompleted } = useTinCan();

    const myFunction = () => {
        saveCompleted();
    }

    // ...
}
```

## Supported TinCan API methods

For now only `Statement` is supported.

## How to prepare a TinCan (xAPI) activity package (zip)

Your React build scripts should ultimately add a tincan.xml file to the root of your build folder.
Edit the xml details, and modify the launch filename depending on your build entry point.
Compress all the files/dirs within the build folder as a `.zip`. 

```
<?xml version="1.0" encoding="utf-8" ?>
<tincan xmlns="http://projecttincan.com/tincan.xsd">
    <activities>
        <activity id="https://my-domain.com/activity/my-activity" type="http://activitystrea.ms/schema/1.0/game">
            <name>My Activity Name</name>
            <description lang="en-US">My Activity Description</description>
            <launch lang="en-us">index.html</launch>
        </activity>
    </activities>
</tincan>
```
