/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AlphabetList from "../index";

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			countries: require('./countries')
		}
	}

	keyExtractor = (item, index) => {
		return `${index}`;
	};

	renderItem = ({item}) => (
		<View style={[styles.item]}>
			<Text>{item.name}</Text>
		</View>
	);

	renderSeparator = () => (
		<View style={styles.separator}/>
	);

	render() {
		return (
			<SafeAreaView style={[styles.container]}>
				<AlphabetList
					data={this.state.countries}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderItem}
					itemKey={'name'}
					color={'#1fb3d3'}
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		paddingVertical: 16,
		paddingHorizontal: 8,
	},
	separator: {
		height: 1,
		backgroundColor: '#e0e0e0'
	},
});
