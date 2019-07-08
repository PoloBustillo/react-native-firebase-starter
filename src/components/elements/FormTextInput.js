import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View
} from "react-native";
import colors from "../../config/colors";


class FormTextInput extends React.Component{
  textInputRef = React.createRef();

  state = {
     isFocused: false
   };

   focus = () => {
     if (this.textInputRef.current) {
       this.textInputRef.current.focus();
     }
   };

   handleFocus = (e) => {
     this.setState({ isFocused: true });
     // Remember to propagate the `onFocus` event to the
     // parent as well (if set)
     if (this.props.onFocus) {
       this.props.onFocus(e);
     }
   };

   handleBlur = (e) => {
     this.setState({ isFocused: false });
     // Remember to propagate the `onBlur` event to the
     // parent as well (if set)
     if (this.props.onBlur) {
       this.props.onBlur(e);
     }
   };

  render() {
    const {
     error,
     onFocus,
     onBlur,
     style,
     ...otherProps
    } = this.props;
    const { isFocused } = this.state;
    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={this.textInputRef}
          selectionColor={colors.DODGER_BLUE}
          underlineColorAndroid={
            isFocused
              ? colors.DODGER_BLUE
              : colors.LIGHT_GRAY
          }
          style={styles.textInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...otherProps}
        />
        <Text style={styles.errorText}>{error || ""}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  textInput: {
    height: 50,
    fontSize:20,
    ...Platform.select({
      ios: {
        borderColor: colors.SILVER,
        borderBottomWidth: StyleSheet.hairlineWidth
      },
      // The underline on Android is slightly misaligned so
      // we fix it by adding a left padding here...
      android: {
        paddingLeft: 6
      }
    })
  },
  errorText: {
    height: 25,
    color: colors.TORCH_RED,
    // ...and here as well
    ...Platform.select({
      android: {
        paddingLeft: 6
      }
    })
  }
});

export default FormTextInput;
