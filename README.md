# react-native-alphabet-list

## Getting started

`$ npm install react-native-alphabet-list --save`

### Mostly automatic installation

`$ react-native link react-native-alphabet-list`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-alphabet-list` and add `RNAlphabetList.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAlphabetList.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.reactlibrary.RNAlphabetListPackage;` to the imports at the top of the file
  - Add `new RNAlphabetListPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-alphabet-list'
  	project(':react-native-alphabet-list').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-alphabet-list/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-alphabet-list')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNAlphabetList.sln` in `node_modules/react-native-alphabet-list/windows/RNAlphabetList.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Alphabet.List.RNAlphabetList;` to the usings at the top of the file
  - Add `new RNAlphabetListPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNAlphabetList from 'react-native-alphabet-list';

// TODO: What to do with the module?
RNAlphabetList;
```
  