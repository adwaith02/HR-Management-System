import React, { useState, useEffect } from 'react';

const AnnouncementPage = () => {
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
  });

  const [announcements, setAnnouncements] = useState([]);

  // Load announcements from localStorage
  useEffect(() => {
    const storedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];
    setAnnouncements(storedAnnouncements);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnnouncement = { ...announcement, id: Date.now(), date: new Date().toLocaleDateString() };
    const updatedAnnouncements = [...announcements, newAnnouncement];
    localStorage.setItem("announcements", JSON.stringify(updatedAnnouncements));
    setAnnouncements(updatedAnnouncements);
    alert("Announcement posted successfully!");
    setAnnouncement({ title: '', content: '' });
  };

  // Function to delete a specific announcement
  const deleteAnnouncement = (id) => {
    const updatedAnnouncements = announcements.filter((announcement) => announcement.id !== id);
    localStorage.setItem("announcements", JSON.stringify(updatedAnnouncements));
    setAnnouncements(updatedAnnouncements);
    alert("Announcement deleted successfully!");
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Post an Announcement</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={announcement.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            rows="5"
            value={announcement.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Post Announcement</button>
      </form>

      <h3 className="mt-5">All Announcements</h3>
      {announcements.length === 0 ? (
        <p>No announcements posted yet.</p>
      ) : (
        <ul className="list-group mt-3">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{announcement.title}</strong>
                <p>{announcement.content}</p>
                <small>{announcement.date}</small>
              </div>
              <button 
                onClick={() => deleteAnnouncement(announcement.id)} 
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnnouncementPage;
