import React from "react";
import nameFormat from '../libs/names.lib'
import { Icon, Label, Menu, Table } from "semantic-ui-react";

const TableUsers = (props) => {
  const { payloadColumn, actions, payload, isIndex = false } = props;
  //console.log(renderCell(payload.usuarios[0]));

  
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {payloadColumn.map((element,index) => (
            <Table.HeaderCell key={index}>{element}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {payload.usuarios.map((element) => {
          console.log(element);

          return (
            <Table.Row>
              <Table.Cell>{nameFormat(element)}</Table.Cell>
              <Table.Cell>{element.rol}</Table.Cell>
              <Table.Cell>{element.email}</Table.Cell>
              <Table.Cell>options</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
      {isIndex ? (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      ) : (
        <></>
      )}
    </Table>
  );
};

export default TableUsers;