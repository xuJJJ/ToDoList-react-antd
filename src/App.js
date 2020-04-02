import React from 'react';

import { Button, Input, Table, message, Radio, Tag } from 'antd' ; 
import './App.css';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [
        {
          key: 1,
          name: '咚咚咚',
          time: '2020-4-2',
          level: 'a'
        },
      ],
      count:2,
      columns: [
        { title: '待办事项', dataIndex: 'name', key: 'name' },
        { title: '创建时间', dataIndex: 'time', key: 'time' },
        { 
          title: '优先级',
          dataIndex: '', 
          key: '',
          render: (data) => {
            let levelDom;
            if(data.level === 'a') {
              levelDom = <Tag color="processing">普通</Tag>
            }
            if(data.level === 'b') {
              levelDom = <Tag color="warning">重要</Tag>
            }
            if(data.level === 'c') {
              levelDom = <Tag color="error">紧急</Tag>
            }
            return levelDom;
          }
        },
        {
          title: '操作',
          dataIndex: '',
          key: 'x',
          render: (data) => <a type="primary" onClick={this.handleDelete.bind(this,data.key)}>完成</a>,
        },
      ],
      inputValue: '',
      buttonValue: 'a'
    }
  }
  componentDidMount() {
    let t = this;
    document.onkeydown = function (event) {
      var e = event || window.event;
      if (e && e.keyCode === 13) { //回车键的键值为13
        t.handleAdd()
      }
    }; 
  }
  handleDelete(key) {
    const data = [...this.state.data];
    this.setState({
      data: data.filter(item => item.key !== key)
    })
    message.success('事项已完成');
  }
  handleAdd() {
    if( this.state.inputValue === '') {
      message.warning('请输入待办事项!')
      return
    }
    const { count, data } = this.state;
    let newData = {
      key: count,
      name: this.state.inputValue,
      level: this.state.buttonValue,
      time: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    }
    this.setState({
      data: [...data, newData],
      count: count + 1,
      inputValue: '',
      buttonValue: 'a'
    })
    message.success('待办事项已添加');
  }
  inputChange(e) {
    e.persist();
    this.setState({
      inputValue: e.target.value
    }) 
  }
  buttonChange(e) {
    this.setState({
      buttonValue: e.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <div className="main">
          <header>
            <Input placeholder="请输入您的待办事项" onChange={(e)=>this.inputChange(e)} value={this.state.inputValue} />
            <Radio.Group defaultValue="a" onChange={(e) => this.buttonChange(e)} value={this.state.buttonValue}>
              <Radio.Button value="a">普通</Radio.Button>
              <Radio.Button value="b">重要</Radio.Button>
              <Radio.Button value="c">紧急</Radio.Button>
            </Radio.Group>
            <Button type="primary" onClick={this.handleAdd.bind(this)}>添加</Button>
          </header>
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={false}
          />
        </div>
    </div>
    )
  }
}
