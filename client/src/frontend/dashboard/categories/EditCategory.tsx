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
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../redux/services/categories";

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

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [imagePath, setImagePath] = useState("");
  const [uploading, setUploading] = useState(false);

  const [updateCategory] = useUpdateCategoryMutation();
  const { data: categoryData, isLoading } = useGetCategoryByIdQuery(id!);
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
    if (categoryData?.category) {
      const { title, slug, imageUrl, description, isActive, parentId } =
        categoryData.category;
      reset({
        title,
        slug,
        imageUrl,
        description,
        isActive,
        parentId: parentId || null,
      });
      setImagePath(imageUrl);
    }
  }, [categoryData, reset]);

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

    const updatedData = { 
      ...value, 
      imageUrl: imagePath || getValues("imageUrl"),
    };

    console.log("Submitting Updated Data:", updatedData); 

    try {
      const res = await updateCategory({ id, updatedData });

      if ("data" in res) {
        toast.success("Category updated successfully");
        navigate("/dashboard/categories");
      } else if ("error" in res) {
        toast.error("Failed to update category");
      }
    } catch (error) {
      console.error("Update category error:", error);
    }
  };

  if (isLoading) return <div className="text-center p-5">Loading...</div>;

  return (
    <Card className="max-w-2xl mx-auto p-4 mb-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
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

              {/* Slug */}
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
                  render={({ field }) => (
                    <TextField
                      select
                      label="Parent Category"
                      fullWidth
                      variant="outlined"
                      {...field}
                    >
                      <MenuItem value={null}>None</MenuItem>
                      {categories
                        .filter((cat) => cat._id !== id)
                        .map((cat) => (
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
                  {uploading ? "Uploading..." : "Update"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default EditCategory;
