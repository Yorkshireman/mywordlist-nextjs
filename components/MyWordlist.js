import { Table } from 'reactstrap';

const MyWordlist = ({ wordlistEntriesData }) => {
  const tableRows = wordlistEntriesData.map((entry, index) => {
    // use the word.name as the key once the backend never sends duplicate words
    return <tr key={index}>
      <th scope='row'>{entry.word.name}</th>
      <td>{entry.description}</td>
      <td>noun home country verb pet</td>
      <style jsx>{`
        td {
          padding: 0;
        }

        th {
          padding: 0;
        }
      `}</style>
    </tr>;
  });

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Word</th>
          <th>Description</th>
          <th>Categories</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
      <style jsx>{`
        td {
          padding: 0;
        }

        th {
          padding: 0;
        }
      `}</style>
    </Table>
  );
};

export default MyWordlist;
