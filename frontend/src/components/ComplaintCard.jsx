function ComplaintCard({ complaint, onResolve }) {
  return (
    <div className="card">
      <h3>{complaint.issue_type}</h3>
      <p>{complaint.description}</p>
      <p>Status: {complaint.status}</p>

      {complaint.status !== "Resolved" && (
        <button onClick={() => onResolve(complaint.id)}>
          Mark Resolved
        </button>
      )}
    </div>
  );
}

export default ComplaintCard;