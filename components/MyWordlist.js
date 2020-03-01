import { Table } from 'reactstrap';

const MyWordlist = ({ wordlistEntriesData }) => {
  const tableRows = wordlistEntriesData.map((entry, index) => {
    // use the word.name as the key once the backend never sends duplicate words
    return <tr key={index}>
      <th scope='row'>{entry.word.name}</th>
      <td>{entry.description}</td>
    </tr>;
  });

  return <Table responsive>
    <thead>
      <tr>
        <th>Word</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {tableRows}
    </tbody>
  </Table>;
};

export default MyWordlist;
