import React from 'react';
import { connect } from 'dva';
import { Button, Modal } from 'antd'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  handleClick() {
    this.setState({
      visible: true
    });

  }

  handleClose() {
    this.setState({
      visible: false
    });
  }

  render() {
    const { user, group } = this.props; 
    return (
      <div>
        <h2>User</h2>
        {
          user&&user.map(({ id, name }) => <div key={id}>- {name}</div>)
        }
        <h2>Group</h2>
        {
          group&&group.map(({ id, group }) => <div key={id}>- {group}</div>)
        }
        <Button onClick={this.handleClick.bind(this)}>点击</Button>
        <Modal visible={this.state.visible} onCancel={this.handleClose.bind(this)}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    group: state.group,
  };
}

export default connect(mapStateToProps)(User);
