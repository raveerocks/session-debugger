import { Column, HColumn, HRow, Row, Table } from './Table';
import { Division, Section, SectionItem } from './Section';

const SectionCard = (props) => {
  return (
    <Section
      header={props.header}
      className='off-colored margin-wrapper-large padding-wrapper-medium round-wrapper-small'
    >
      {props.children}
    </Section>
  );
};

const DivisionCard = (props) => {
  return (
    <Division
      header={props.header}
      className='off-colored margin-wrapper-small'
    >
      {props.children}
    </Division>
  );
};

const SectionItemCard = (props) => {
  return (
    <SectionItem
      title={props.title}
      icon={props.icon}
      className='margin-wrapper-small round-wrapper-small  bordered-wrapper secondary-colored'
      titleClass='margin-wrapper-medium  round-wrapper-small padding-wrapper-small primary-dark-colored black-shadow-wrapper'
    >
      {props.children}
    </SectionItem>
  );
};

const TableCard = (props) => {
  return <Table className='table-table'>{props.children}</Table>;
};

const RowCard = (props) => {
  return <Row className='table-row'>{props.children}</Row>;
};

const HRowCard = (props) => {
  return <HRow className='table-row'>{props.children}</HRow>;
};

const ColumnCard = (props) => {
  return <Column className='table-col'>{props.children}</Column>;
};

const HColumnCard = (props) => {
  return <HColumn className='table-col'>{props.children}</HColumn>;
};

const VTableCard = (props) => {
  return <Table className='table-vtable'>{props.children}</Table>;
};

const VRowCard = (props) => {
  return <Row className='table-vrow'>{props.children}</Row>;
};

const VHRowCard = (props) => {
  return <HRow className='table-vrow'>{props.children}</HRow>;
};

const VColumnCard = (props) => {
  return <Column className='table-vcol'>{props.children}</Column>;
};

const VHColumnCard = (props) => {
  return <HColumn className='table-vcol'>{props.children}</HColumn>;
};
const VHColumnCenterCard = (props) => {
  return (
    <HColumn className='table-vcol table-center-col'>{props.children}</HColumn>
  );
};

export {
  SectionCard,
  DivisionCard,
  SectionItemCard,
  TableCard,
  RowCard,
  HRowCard,
  ColumnCard,
  HColumnCard,
  VTableCard,
  VRowCard,
  VHRowCard,
  VColumnCard,
  VHColumnCard,
  VHColumnCenterCard,
};
