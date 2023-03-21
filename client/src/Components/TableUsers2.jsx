import React from "react";

import nameFormat from "../libs/names.lib";
import { Icon, Button, Menu, Table } from "semantic-ui-react";
import { useAdminPage } from "../Context/AdminPageProvider";

const TableUsers = (props) => {
  const { payloadColumn, actions, payload, isIndex = false } = props;
  //console.log(payload.usuarios[0]);
  const { bodyTableAdmin } = useAdminPage();

  return (
    <div >
      <Table celled ref={ref}>
        <Table.Header>
          <Table.Row>
            {payloadColumn.map((element, index) => (
              <Table.HeaderCell key={index}>{element}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        {bodyTableAdmin(payload, actions)}
        {/* <Table.Body>
          {payload.usuarios.map((element) => {
            //console.log(element);
            return (
              <Table.Row key={element.id}>
                <Table.Cell>{nameFormat(element)}</Table.Cell>
                <Table.Cell>{element.rol}</Table.Cell>
                <Table.Cell>{element.email}</Table.Cell>
                <Table.Cell>{actions[0]}</Table.Cell>
                <Table.Cell>{actions[1]}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body> */}

        <Table.Footer>
          <Table.Row>
            {isIndex ? (
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
            ) : (
              <></>
            )}
            <Table.HeaderCell colSpan="1">
              <Button>
                <Icon name="user" /> Add User
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default TableUsers;
