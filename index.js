import React from "react";
import {View, StyleSheet, Text, FlatList, PanResponder, Animated} from "react-native";
import PropTypes from "prop-types";

class AlphabetList extends FlatList {
	constructor(props) {
		super(props);

		this.state = {
			animation: new Animated.Value(0),
			letters: "abcdefghijklmnopqrstuvwxz".toUpperCase().split(''),
			activePosition: 0,
			dimensions: {
				top: 0,
				height: 0,
			},
		};

		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: this.handleOnFingerTouch, //TODO add debounce
			onPanResponderMove: this.handleOnFingerMove, //TODO add debounce
			onPanResponderTerminate: this.handleOnFingerStop,
			onPanResponderRelease: this.handleOnFingerStop,
		});
	}

	componentDidMount() {
	}

	getTouchedLetter = (y) => {
		const {dimensions, letters} = this.state;

		y = y - (dimensions.top || 0);

		if (y >= 1 && y <= dimensions.height) {
			this.setState({
				activePosition: y
			});

			y -= (dimensions.height / letters.length) / 2;

			return letters[Math.round(((y * letters.length) / dimensions.height))]
		}
	};

	handleOnFingerTouch = (e, state) => {
		this.handleOnTouchLetter(this.getTouchedLetter(state.y0));

		Animated.timing(this.state.animation, {
			toValue: 1,
			duration: 200,
		}).start();
	};

	handleOnFingerMove = (evt, state) => {
		this.handleOnTouchLetter(this.getTouchedLetter(state.moveY));
	};

	handleOnFingerStop = () => {
		Animated.timing(this.state.animation, {
			toValue: 0,
			duration: 200,
		}).start(() => {
			this.setState({
				active: null,
			});
		});
	};

	handleOnTouchLetter = (letter) => {
		const {data} = this.props;

		if (letter) {
			this.setState({
				active: letter
			}, () => {
				let index = 0;

				data?.forEach((item, i) => {
					let value;
					if (this.props.itemKey) {
						value = item[this.props.itemKey];
					}
					else {
						value = this.props.getItemValue(item);
					}

					if (value.toString().charAt(0).toUpperCase() === letter.toUpperCase()) {
						index = i;
						return false;
					}
				});

				this.list?.scrollToIndex({
					index: Math.min(index, data?.length - 1),
					animated: this.props.animated,
				});
			});
		}
	};

	handleOnLayout = () => {
		this.scrollbar?.measure((width, x1, y1, height, px, py) => {
			this.setState({
				dimensions: {
					top: py,
					left: px,
					width: width,
					height: height
				},
			});
		});
	};

	render() {
		const {letters, active} = this.state;

		return (
			<View style={styles.container}>
				<FlatList ref={(ref) => (this.list = ref)} {...this.props}/>

				<View
					ref={(ref) => (this.scrollbar = ref)}
					onLayout={this.handleOnLayout}
					style={styles.scrollbar}
					{...this.panResponder.panHandlers}>

					{letters.map((letter, index) => (
						<View
							key={index}
							style={[
								styles.letter,
								letter === active && styles.letterActive,
								letter === active && this.props.activeLetterStyle,
							]}>
							<Text
								style={[
									styles.letterText,
									letter === active && this.props.color && {color: this.props.color},
									letter === active && styles.letterTextActive,
									letter === active && this.props.activeLetterTextStyle,
								]}>{letter}</Text>
						</View>
					))}

				</View>

				<Animated.View
					style={[
						{
							position: 'absolute',
							right: 45,
							transform: [{translateY: -25}],
							flexDirection: 'row',
							alignItems: 'center'
						},
						{
							top: this.state.activePosition,
							opacity: this.state.animation,
						}
					]}>

					<View
						style={[
							{
								position: 'absolute',
								right: 0,
								width: 0,
								height: 0,
								backgroundColor: 'transparent',
								borderStyle: 'solid',
								borderWidth: 10,
								borderTopColor: 'transparent',
								borderRightColor: 'transparent',
								borderBottomColor: 'transparent',
								borderLeftColor: '#ff0000',
								transform: [
									{translateX: 20},
								]
							},
							this.props.color && {borderLeftColor: this.props.color},
						]}/>

					<View
						style={[
							{
								backgroundColor: '#ff0000',
								width: 50,
								aspectRatio: 1,
								borderRadius: 8,
								justifyContent: 'center',
								alignItems: 'center'
							},
							this.props.color && {backgroundColor: this.props.color},
						]}>
						<Text
							style={[
								styles.letterText,
								{
									fontSize: (styles.letterText?.fontSize || 16) + 4,
								},
							]}>
							{this.state.active}
						</Text>
					</View>
				</Animated.View>
			</View>
		);
	}
}

AlphabetList.propTypes = {
	animated: PropTypes.bool,
	onScrollToIndexFailed: PropTypes.func,
	itemKey: PropTypes.string,
	getItemValue: PropTypes.func,
	activeLetterStyle: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
	]),
	activeLetterTextStyle: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
	]),
};

AlphabetList.defaultProps = {
	animated: false,
	onScrollToIndexFailed: () => {},
	itemKey: '',
	getItemValue: (item) => {
		return item;
	},
	activeLetterStyle: {},
	activeLetterTextStyle: {},
};

export default AlphabetList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	scrollbar: {
		flexDirection: 'column',
	},
	letter: {
		flex: 1,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	letterText: {
		fontSize: 20,
	},
	letterActive: {
	},
	letterTextActive: {
	}
});