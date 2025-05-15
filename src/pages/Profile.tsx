import { ChangeEvent, FormEvent, useState } from 'react';

import PageHelmet from '../components/PageHelmet';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    bio: 'Frontend developer passionate about React and TypeScript. Love creating intuitive user interfaces and optimizing web performance.',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <PageHelmet routeKey="PROFILE" />

      <h1>My Profile</h1>

      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar-container">
            <img
              src={profile.avatarUrl}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="profile-avatar"
            />
          </div>

          <div className="profile-title">
            <h2>
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="profile-email">{profile.email}</p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="edit-profile-btn"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-edit-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={5}
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="avatarUrl">Avatar URL</label>
              <input
                type="url"
                id="avatarUrl"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-profile-btn">
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="profile-section">
              <h3>Bio</h3>
              <p>{profile.bio}</p>
            </div>

            <div className="profile-section">
              <h3>Account Information</h3>
              <div className="info-group">
                <span className="info-label">Email:</span>
                <span className="info-value">{profile.email}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Member since:</span>
                <span className="info-value">January 15, 2023</span>
              </div>
              <div className="info-group">
                <span className="info-label">Last login:</span>
                <span className="info-value">Today at 10:23 AM</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
