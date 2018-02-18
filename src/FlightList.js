import React, { Component } from 'react';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class TableExampleSingleLine extends Component {
    dateFormatter = date => moment.unix(date).format("DD/MM/YYYY, H:mm")

    render() {
        const options = {
          hideSizePerPage: true,
          sizePerPage: 5,
        };

        return (
            <div>
                <BootstrapTable data={this.props.flights} striped hover pagination version='4' options={ options }>
                  <TableHeaderColumn isKey dataField='id' hidden></TableHeaderColumn>
                  <TableHeaderColumn dataField='cityFrom'>From</TableHeaderColumn>
                  <TableHeaderColumn dataField='cityTo'>To</TableHeaderColumn>
                  <TableHeaderColumn dataField='dTime' dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                  <TableHeaderColumn dataField='price'>Price in EUR</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}


export default TableExampleSingleLine
