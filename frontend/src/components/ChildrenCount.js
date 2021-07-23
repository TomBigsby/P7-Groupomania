import { Children } from 'react';

function ChildrenCount(props) {
    return <div>{Children.count(props.children)}</div>;
}

export default ChildrenCount;