
Flume Music App
===============
[http://flumemusic.com](http://www.flumemusic.com)

[![Flume Music](https://dimensionsoftware.com/images/flume.png)](https://dimensionsoftware.com)

## Quick Start

    $ git clone git@github.com:DimensionSoftware/Flume.git
    $ cd flume && npm i && npm start
    $ open ios/flume.xcodeproj/

  Press Command+R in XCode to Build &amp; Run!

## Booting a Store-Ready, Self-Contained App

1. [Follow Facebook's Guide to Running on Devices](https://facebook.github.io/react-native/docs/running-on-device-ios.html#content)

2. If those instructions result in a white screen, ensure Xcode's PATH includes the react-native binary; or-- go ahead and manually build the bundle, eg:

        $ react-native bundle --entry-file index.ios.js --platform ios --dev false --bundle-output '$USER/Library/Developer/Xcode/DerivedData/flume/Build/Products/Release-iphoneos/Flume Music.app/main.jsbundle' --assets-dest '/Users/$USER/Library/Developer/Xcode/DerivedData/flume/Build/Products/Release-iphoneos/Flume Music.app'

    Your exact command should be toward the end of the Build Output from:

    **Xcode** -> **Build Phases** -> **Bundle React Native code and images**


&nbsp;

[![Fresh Software by Dimension](https://dimensionsoftware.com/images/software_by.png)](https://dimensionsoftware.com)
