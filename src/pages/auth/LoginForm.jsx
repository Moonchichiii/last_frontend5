return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        type="text"
        className="form-control mb-2"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
        autoComplete="username"
      />

      <input
        name="password"
        type="password"
        className="form-control mb-2"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        autoComplete="current-password"
      />
      {errors.login && <Alert variant="danger">{errors.login}</Alert>}

      <Button type="submit" variant="primary">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
