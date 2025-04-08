import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import slugify from "slugify";
import { useAddCategoryMutation, useGetAllCategoriesQuery } from "../../../redux/services/categories";
import { useNavigate } from "react-router-dom";

type CategoryFormValues = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  isActive: boolean;
  parentId: string | null;
};

type Category = {
  _id: string;
  title: string;
};

const AddCategory = () => {
  const navigate = useNavigate();
  const [imagePath, setImagePath] = useState("");
  const [uploading, setUploading] = useState(false);
  const [addCategory] = useAddCategoryMutation();
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories: Category[] = categoriesData?.categories || [];

  const methods = useForm<CategoryFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      imageUrl: "",
      description: "",
      isActive: false,
      parentId: null,
    },
  });

  const {
    reset,
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const slug = slugify(value.title || "", { lower: true });
        setValue("slug", slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloudName);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      const fileObj = await res.json();
      if (fileObj.error) throw new Error(fileObj.error.message);

      setImagePath(fileObj.url);
      setValue("imageUrl", fileObj.url);
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmitHandler = async (value: CategoryFormValues) => {
    try {
      const res = await addCategory(value);
      console.log(res);
      
      if ("data" in res) {
        toast.success("Category added successfully");
        reset();
        setImagePath("");
        setValue("slug", "");
        navigate("/dashboard/categories");
      } else if ("error" in res) {
        toast.error("Failed to add category");
      }
    } catch (error) {
      console.error("Add category error:", error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-4 mb-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>
              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  label="* Title"
                  fullWidth
                  variant="outlined"
                  {...register("title", { required: true })}
                  error={!!errors.title}
                  helperText={errors.title && "Title is required"}
                />
              </Grid>

              {/* Slug (hidden or editable) */}
              <Grid item xs={12}>
                <TextField
                  label="Slug"
                  fullWidth
                  variant="outlined"
                  {...register("slug", { required: true })}
                  error={!!errors.slug}
                  helperText="Auto-generated from title"
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  {...register("description")}
                />
              </Grid>

              {/* Parent Category */}
              <Grid item xs={12}>
              <Controller
                name="parentId"
                control={methods.control}
                defaultValue={null}
                render={({ field }) => (
                  <TextField
                    select
                    label="Parent Category"
                    fullWidth
                    variant="outlined"
                    {...field}
                  >
                    <MenuItem value={null}>None</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.title}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              </Grid>

              {/* Is Active */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox {...register("isActive")} />}
                  label="Is Active"
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <label className="form-label">Category Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                  disabled={uploading}
                />
                {imagePath && (
                  <img
                    src={imagePath}
                    alt="Preview"
                    className="mt-3 rounded shadow-sm"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                )}
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} className="text-end">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default AddCategory;
