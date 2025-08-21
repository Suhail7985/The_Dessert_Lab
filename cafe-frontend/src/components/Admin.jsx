import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-container">
      {/* Admin Header */}
      <div className="admin-header">
        <h1>🎯 Admin Dashboard</h1>
        <p>Manage your cafe operations efficiently</p>
      </div>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-value">150+</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card products">
          <div className="stat-icon">🍰</div>
          <div className="stat-value">25+</div>
          <div className="stat-label">Products</div>
        </div>
        <div className="stat-card orders">
          <div className="stat-icon">📋</div>
          <div className="stat-value">89</div>
          <div className="stat-label">Orders Today</div>
        </div>
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹45K</div>
          <div className="stat-label">Monthly Revenue</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/admin/products" className="quick-action-btn">
          <div className="quick-action-icon">➕</div>
          <div className="quick-action-label">Add Product</div>
        </Link>
        <Link to="/admin/orders" className="quick-action-btn">
          <div className="quick-action-icon">📊</div>
          <div className="quick-action-label">View Orders</div>
        </Link>
        <Link to="/admin/users" className="quick-action-btn">
          <div className="quick-action-icon">👤</div>
          <div className="quick-action-label">Manage Users</div>
        </Link>
        <Link to="/admin/subscribers" className="quick-action-btn">
          <div className="quick-action-icon">📧</div>
          <div className="quick-action-label">Newsletter</div>
        </Link>
      </div>

      {/* Welcome Message */}
      <div className="welcome-message">
        <h3>🚀 Welcome to Your Admin Panel!</h3>
        <p>Everything you need to manage your cafe is right here. Get started by exploring the options below.</p>
      </div>

      {/* Admin Navigation */}
      <div className="admin-nav">
        <Link 
          to="/admin/products" 
          className={isActive("/admin/products") ? "active" : ""}
        >
          🍰 Products Management
        </Link>
        <Link 
          to="/admin/orders" 
          className={isActive("/admin/orders") ? "active" : ""}
        >
          📋 Orders Management
        </Link>
        <Link 
          to="/admin/users" 
          className={isActive("/admin/users") ? "active" : ""}
        >
          👥 Users Management
        </Link>
        <Link 
          to="/admin/subscribers" 
          className={isActive("/admin/subscribers") ? "active" : ""}
        >
          📧 Newsletter Subscribers
        </Link>
      </div>

      {/* Admin Content */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}