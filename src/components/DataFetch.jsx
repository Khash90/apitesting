import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import './data.css'

const DataFetch = () => {
  // declaring states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // declering our columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      wrap: true,
      grow: 0,
      maxwidth: "150px",
    },
    {
      name: "TITLE",
      selector: (row) => row.title,
      wrap: true,
      grow: 0,
      maxwidth: '150px'
    },

    {
      name: "DESCRIPTION",
      selector: (row) => row.product_details,
      wrap: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      wrap: true,
      grow: 0,
      maxwidth: '150px'
    },
  ];

  // calling our fetch function
  useEffect(() => {
    fetchApi();
  }, []);

  // creating fetch function with error handling(try-catch)
  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://chapazon.com/api/tenders");
      if (!response.ok) {
        throw new Error(`http request faild  ${response.status}`);
      }
      const data = await response.json();
      setData(data.tenders);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-container">
    
      {/* calling our data-table-component */}
      <DataTable
        title="Chapazon Data-Table"
        columns={columns}
        loading={loading}
        data={data}
        pagination
      />
    </div>
  );
};

export default DataFetch;
