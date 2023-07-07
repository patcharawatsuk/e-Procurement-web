import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

const Approved: React.FC = () => {
  return (
    <tbody>
      <tr>
        <td>1</td>
        <td>Requester</td>
        <td>
          <div className="text-status-color green">
            <i className="icon-dot"></i>
            <span>Approved</span>
          </div>
        </td>
        <td>
          <a
            title="Edit"
            // onmouseover='stooltip(this,"action")'
            // onmouseout="htooltip()"
            className="action-icon"
          >
            <i className="icon-edit"></i>
          </a>
          <a
            title="Delete"
            // onmouseover='stooltip(this,"action")'
            // onmouseout="htooltip()"
            className="action-icon"
          >
            <i className="icon-delete"></i>
          </a>
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Requester</td>
        <td>
          <div className="text-status-color green">
            <i className="icon-dot"></i>
            <span>Approved</span>
          </div>
        </td>
        <td>
          <a
            title="Edit"
            // onmouseover='stooltip(this,"action")'
            // onmouseout="htooltip()"
            className="action-icon"
          >
            <i className="icon-edit"></i>
          </a>
          <a
            title="Delete"
            // onmouseover='stooltip(this,"action")'
            // onmouseout="htooltip()"
            className="action-icon"
          >
            <i className="icon-delete"></i>
          </a>
        </td>
      </tr>
      <tr>
        <td>3</td>
        <td>Requester</td>
        <td>
          <div className="text-status-color green">
            <i className="icon-dot"></i>
            <span>Approved</span>
          </div>
        </td>
        <td>
          <a
            title="Edit"
            // onmouseover='stooltip(this,"action")'
            // onmouseout="htooltip()"
            className="action-icon"
          >
            <i className="icon-edit"></i>
          </a>
          <a
            title="Delete"
            // onmouseover='stooltip(this,"action")'
            // onmouseout="htooltip()"
            className="action-icon"
          >
            <i className="icon-delete"></i>
          </a>
        </td>
      </tr>
    </tbody>
  );
};

export default Approved;
