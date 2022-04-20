import './Table.css';

const Table = (props) => {
  return <div className={`${props.className}`}>{props.children}</div>;
};

const Row = (props) => {
  return <div className={`row ${props.className}`}>{props.children}</div>;
};

const HRow = (props) => {
  return (
    <div className={`row table-hrow ${props.className}`}>{props.children}</div>
  );
};

const Column = (props) => {
  return <div className={`col ${props.className}`}>{props.children}</div>;
};

const HColumn = (props) => {
  return (
    <div className={`col table-hcol ${props.className}`}>{props.children}</div>
  );
};

export { Table, Row, HRow, Column, HColumn };
