import './Section.css';

const SectionItem = (props) => {
  return (
    <div
      className={`col ${props.className}`}
      style={props.style ? props.style : {}}
    >
      <div className={`section-item-title ${props.titleClass}`}>
        <h4>
          {props.icon && <props.icon />} {props.title}
        </h4>
      </div>
      {props.children}
    </div>
  );
};

const Division = (props) => {
  return (
    <div
      className={` row ${props.className}`}
      style={props.style ? props.style : {}}
    >
      {props.children}
    </div>
  );
};

const Section = (props) => {
  const result = (
    <div
      className={`${props.className}`}
      style={props.style ? props.style : {}}
    >
      <div className='padding-wrapper-medium'>
        <h3 className='section-header'>{props.header}</h3>
      </div>
      {props.children}
    </div>
  );
  return result;
};

export { SectionItem, Division, Section };
