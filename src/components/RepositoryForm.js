import React from "react";
import { Input, Button, Label } from "../styles/styles";

const RepositoryForm = ({ onSubmit, onChange, path, className }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      <Label htmlFor="url">Show open issues for https://github.com/</Label>
      <Input
        id="url"
        type="text"
        value={path}
        onChange={onChange}
        style={{ width: "300px" }}
      />
      <Button type="submit" primary margin>
        Search
      </Button>
    </form>
  );
};

export default RepositoryForm;
