import _ from 'lodash';
import persianJs from 'persianjs';
import React, { Component } from 'react';
import { Form, Radio, Checkbox } from 'semantic-ui-react';
import Content from '~/components/global/mdx';

class ChoiceAnswer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    e.preventDefault();
    const { id, qtype, changeAnswer } = this.props;
    changeAnswer({
      id,
      qtype,
      value,
      number: 0,
      count: 1,
    });
  }

  render() {
    const { content, number, count, choices, saved } = this.props;
    return (
      <>
        <Content
          content={`سوال ${persianJs(number)
            .englishNumber()
            .toString()}. ${content}`}
        />
        <Form style={{ margin: '1rem auto' }}>
          {_.map(choices, (choice, i) => (
            <Form.Group key={i} width={2} dir="rtl">
              <Form.Field
                label={choice.body}
                value={choice.label}
                checked={_.includes(_.get(saved, `n0`, []), choice.label)}
                control={count === 1 ? Radio : Checkbox}
                width={8}
                onChange={this.handleChange}
              />
            </Form.Group>
          ))}
        </Form>
      </>
    );
  }
}

export default ChoiceAnswer;
