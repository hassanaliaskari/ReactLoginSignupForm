import React from 'react';
import PropTypes from 'prop-types';
import Input from './input.js';

let backgroundStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: '#3498DB',
};

let containerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  backgroundColor: '#2E86C1D8',
  padding: '3rem 2rem',
  'msTransform': 'translateX(-50%) translateY(-50%)',
  'webkitTransform': 'translate(-50%,-50%)',
  'transform': 'translate(-50%,-50%)',
  borderTopLeftRadius: '1rem',
};

let loginButtonStyle = {
  float: 'right',
  cursor: 'pointer',
  marginTop: '1.5rem',
  padding: '0.5rem 1rem',
  color: '#FFF',
  fontSize: '0.875rem',
  backgroundPosition: 'center',
  transition: 'background 0.8s',
};

let errorStyle = {
  fontSize: '0.875rem',
  height: '1rem',
  color: '#CC2C21',
  fontStyle: 'italic',
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
    };
  }

  componentWillMount() {
    this._updateStyles();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.isLoggedIn) {
      this.props.history.replace(this.props.redirectUrl);
    }
  }

  _resetError() {
    this.setState({ usernameError: '', passwordError: '' });
  }

  _isInputValid() {
    this._resetError();
    let isValid = true;

    if (this.state.username === '') {
      this.setState({ usernameError: 'Username cannot be empty' });
      isValid = false;
    }
    if (this.state.password === '') {
      this.setState({ passwordError: 'Password cannot be empty' });
      isValid = false;
    }

    return isValid;
  }

  _login() {
    if (this._isInputValid()) {
      this.props.dispatch(this.props.tryLoginAction());
    }
  }

  _onUsernameChange(val) {
    this.setState({ username: val });
  }

  onPasswordChange(val) {
    this.setState({ password: val });
  }

  _updateStyles() {
    // Background Styles
    if (this.props.backgroundStyle !== null) {
      backgroundStyle = this.props.backgroundStyle;
    } else {
      if (this.props.backgroundColor !== null) {
        backgroundStyle.backgroundColor = this.props.backgroundColor;
      }
      if (this.props.backgroundImageUrl !== null) {
        backgroundStyle.backgroundImage = `url('${this.props.backgroundImageUrl}')`;
      }
      if (this.props.backgroundRepeat !== null) {
        backgroundStyle.backgroundRepeat = this.props.backgroundRepeat ? 'repeat' : 'no-repeat';
      }
      if (this.props.backgroundSize !== null) {
        backgroundStyle.backgroundSize = this.props.backgroundSize;
      }
    }

    // Login Container Box Styles
    if (this.props.containerStyle !== null) {
      containerStyle = this.props.containerStyle;
    } else {
      if (this.props.containerColor !== null) {
        containerStyle.backgroundColor = this.props.containerColor;
      }
      if (this.props.containerPosition !== null) {
        if (this.props.containerPosition <= 1 && this.props.containerPosition >= 0) {
          containerStyle.left = `${this.props.containerPosition*100}%`
        }
      }
    }

    //Button Styles
    if (this.props.buttonColor !== null) {
      loginButtonStyle.color = this.props.buttonColor;
    }
  }

  _renderUsernameInput() {
    return (
      <div>
        {
          React.cloneElement(this.props.inputElement, {
            onChange: (val) => this._onUsernameChange(val),
            value: this.state.username,
          })
        }
        <div style={errorStyle}>
          {this.state.usernameError}
        </div>
      </div>
    );
  }

  _renderPasswordInput() {
    return (
      <div>
        {
          React.cloneElement(this.props.inputElement, {
            onChange: (val) => this.onPasswordChange(val),
            value: this.state.password,
            isPassword: true,
          })
        }
        <div style={errorStyle}>
          {this.state.passwordError}
        </div>
      </div>
    );
  }

  _renderLoginButton() {
    const style = {
      float: 'right',
      marginTop: '1.5rem',
    };

    return (
      <div style={style}>
        {
          React.cloneElement(this.props.buttonElement, {
            onClick: () => this._login()
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        <div style={backgroundStyle}>
          <div style={containerStyle}>
            {
              this.props.inputElement ? (
                <div>
                  {this._renderUsernameInput()}
                  {this._renderPasswordInput()}
                </div>
              ) : (
                <div>
                  <Input
                    borderColor={this.props.inputBorderColor}
                    borderFocusedColor={this.props.inputBorderFocusedColor}
                    fontColor={this.props.inputFontColor}
                    hintColor={this.props.inputHintColor}
                    hintFocusedColor={this.props.inputHintFocusedColor}
                    hintText="Username"
                    onChange={(val) => this._onUsernameChange(val)}
                    value={this.state.username}
                    width={this.props.inputWidth}
                  />
                  <div style={errorStyle}>
                    {this.state.usernameError}
                  </div>
                  <Input
                    borderColor={this.props.inputBorderColor}
                    borderFocusedColor={this.props.inputBorderFocusedColor}
                    fontColor={this.props.inputFontColor}
                    hintColor={this.props.inputHintColor}
                    hintFocusedColor={this.props.inputHintFocusedColor}
                    hintText="Password"
                    isPassword={true}
                    onChange={(val) => this.onPasswordChange(val)}
                    value={this.state.password}
                    width={this.props.inputWidth}
                  />
                  <div style={errorStyle}>
                    {this.state.passwordError}
                  </div>
                </div>
              )
            }
            {
              this.props.buttonElement ? (
                this._renderLoginButton()
              ) : (
                <div
                  onClick={() => this._login()}
                  style={loginButtonStyle}
                >
                  LOGIN
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImageUrl: PropTypes.string,
  backgroundRepeat: PropTypes.bool,
  backgroundSize: PropTypes.string,
  backgroundStyle: PropTypes.object,
  buttonElement: PropTypes.node,
  containerColor: PropTypes.string,
  containerPosition: PropTypes.number,
  containerStyle: PropTypes.object,
  inputBorderColor: PropTypes.string,
  inputBorderFocusedColor: PropTypes.string,
  inputElement: PropTypes.node,
  inputFontColor: PropTypes.string,
  inputHintColor: PropTypes.string,
  inputHintFocusedColor: PropTypes.string,
  inputWidth: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  tryLoginAction: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  backgroundColor: null,
  backgroundImageUrl: null,
  backgroundRepeat: null,
  backgroundSize: null,
  backgroundStyle: null,
  buttonElement: null,
  containerColor: null,
  containerPosition: null,
  containerStyle: null,
  inputBorderColor: null,
  inputBorderFocusedColor: null,
  inputElement: null,
  inputFontColor: null,
  inputHintColor: null,
  inputHintFocusedColor: null,
  inputWidth: null,
};

export default LoginForm;
