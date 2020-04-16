import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      result: '',
    };
  }
  handleOp(op) {
    if (op === 'C') {
      this.setState({
        display: '',
        result: '',
      });
    } else if (op === '=') {
      this.setState({
        display: this.state.result,
        result: '',
      });
    } else {
      const display = this.state.display + op;
      let result = this.state.result;
      try {
        let fixedOperation = display.split('X').join('*');
        fixedOperation = fixedOperation.split('÷').join('/');
        fixedOperation = fixedOperation.split(',').join('.');
        result = new String(eval(fixedOperation)).toString();
      } catch (e) {}
      this.setState({
        display,
        result,
      });
    }
  }
  render() {
    const col1Buttons = [
      ['7', '8', '9'],
      ['6', '5', '4'],
      ['3', '2', '1'],
      [',', '0', '='],
    ];
    const col2Button = ['C', '÷', 'X', '-', '+'];
    return (
      <View style={styles.container}>
        <Text style={styles.display}>{this.state.display}</Text>
        <Text style={styles.res}>{this.state.result}</Text>
        <View style={styles.buttons}>
          <View style={styles.col1}>
            {col1Buttons.map((line, ind) => (
              <View key={ind} style={styles.line}>
                {line.map((op) => (
                  <TouchableOpacity
                    key={op}
                    style={styles.btn}
                    onPress={() => this.handleOp(op)}>
                    <Text style={styles.btnText}>{op}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.col2}>
            {col2Button.map((op) => (
              <TouchableOpacity
                key={op}
                style={styles.btn}
                onPress={() => this.handleOp(op)}>
                <Text style={styles.btnText}>{op}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display: {
    flex: 1,
    backgroundColor: '#efefef',
    fontSize: 80,
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10,
  },
  res: {
    flex: 0.4,
    backgroundColor: '#efefef',
    fontSize: 40,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10,
  },
  buttons: {
    flex: 5,
    flexDirection: 'row',
  },
  col1: {
    flex: 3,
    backgroundColor: 'black',
  },
  line: {
    flexDirection: 'row',
    flex: 1,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
  },
  col2: {
    flex: 1,
    backgroundColor: '#1A9392',
  },
});
