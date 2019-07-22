# react-native-sorted-list

## Getting started

`$ npm install react-native-sorted-list --save`

**or**

`$ yarn add react-native-sorted-list`

## ScreenShot

![Example screenshot](example/assets/screenshots/example.gif?raw=true "Example screenshot")

## Usage
```javascript
import SortedList from "react-native-sorted-list";

<SortedList
    data={this.state.items}
    keyExtractor={this.keyExtractor}
    renderItem={this.renderItem}
/>
```
  