import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Chip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../redux/services/categories";
import { useAddProductMutation } from "../../../redux/services/products";

type ProductFormValues = {
  title: string;
  slug: string;
  imageUrl: string;
  productImages: string[];
  description?: string;
  isActive: boolean;
  isWholesale: boolean;
  sku?: string;
  barcode?: string;
  productCode?: string;
  unit?: string;
  productPrice: number;
  salePrice?: number;
  wholesalePrice?: number;
  wholesaleQty?: number;
  productStock?: number;
  qty?: number;
  tags: string[];
  categoryId: string;
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [mainImagePath, setMainImagePath] = useState("");
  const [productImagesPaths, setProductImagesPaths] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [addProduct] = useAddProductMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const methods = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      imageUrl: "",
      productImages: [],
      description: "",
      isActive: true,
      isWholesale: false,
      sku: "",
      barcode: "",
      productCode: "",
      unit: "Unit",
      productPrice: 0,
      salePrice: undefined,
      wholesalePrice: undefined,
      wholesaleQty: undefined,
      productStock: 0,
      qty: 1,
      tags: [],
      categoryId: ""
    },
  });

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const isWholesale = watch("isWholesale");

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugify(value.title || "", { lower: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const fileObj = await res.json();
      if (fileObj.error) throw new Error(fileObj.error.message);

      return fileObj.secure_url;
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
      return null;
    }
  };

  const handleMainImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setMainImagePath(imageUrl);
      setValue("imageUrl", imageUrl);
    }
    setUploading(false);
  };

  const handleMultipleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    setUploading(true);

    const urls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }

    setProductImagesPaths(urls);
    setValue("productImages", urls);
    setUploading(false);
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const res = await addProduct(data);

      if ("data" in res) {
        toast.success("Product added successfully");
        reset();
        setMainImagePath("");
        setProductImagesPaths([]);
        navigate("/dashboard/products");
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 mb-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Title + Slug */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="* Title"
                  fullWidth
                  {...register("title", { required: "Title is required" })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label=""
                  fullWidth
                  {...register("slug")}
                  InputProps={{ readOnly: true }}
                  helperText="Auto-generated slug from title. Can be edited manually."
                />
              </Grid>

              {/* Prices */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="* Product Price"
                  fullWidth
                  type="number"
                  {...register("productPrice", { required: true })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Sale Price" fullWidth type="number" {...register("salePrice")} />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControlLabel
                  control={<Checkbox {...register("isWholesale")} />}
                  label="Is Wholesale"
                />
              </Grid>
              {/* Conditionally Render Wholesale Fields */}
              {isWholesale && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Wholesale Price"
                      fullWidth
                      type="number"
                      {...register("wholesalePrice")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Wholesale Qty"
                      fullWidth
                      type="number"
                      {...register("wholesaleQty")}
                    />
                  </Grid>
                </>
              )}

              {/* Stock & Quantity */}
              <Grid item xs={12} md={4}>
                <TextField label="Stock" fullWidth type="number" {...register("productStock")} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Qty" fullWidth type="number" {...register("qty")} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Unit" fullWidth {...register("unit")} />
              </Grid>

              {/* Identifiers */}
              <Grid item xs={12} md={4}>
                <TextField label="SKU" fullWidth {...register("sku")} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Barcode" fullWidth {...register("barcode")} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Product Code" fullWidth {...register("productCode")} />
              </Grid>

              {/* Category & Unit */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <TextField
                      label="* Category"
                      fullWidth
                      select
                      {...field}
                      error={!!errors.categoryId}
                      helperText={errors.categoryId?.message}
                    >
                      {categories?.categories?.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Tags (comma separated)"
                      fullWidth
                      value={field.value.join(", ")}
                      onChange={(e) =>
                        field.onChange(e.target.value.split(",").map((tag) => tag.trim()))
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                {watch("tags")?.map((tag, i) => (
                  <Chip
                    key={i}
                    label={tag}
                    className="mr-1 mb-1"
                    onDelete={() => {
                      const newTags = watch("tags").filter((_, index) => index !== i);
                      setValue("tags", newTags);
                    }}
                  />
                ))}
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField label="Description" fullWidth multiline rows={3} {...register("description")} />
              </Grid>

              {/* Boolean flags */}
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Checkbox {...register("isActive")} />}
                  label="Is Active"
                />
              </Grid>

              {/* Image Uploads */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Main Product Image
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleMainImageUpload}
                  />
                </Button>
                <div>
                {mainImagePath && (
                  <div style={{ position: "relative", display: "inline-block", marginTop: 8 }}>
                    <img
                      src={mainImagePath}
                      alt="Main"
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => {
                        setMainImagePath("");
                        setValue("imageUrl", "");
                      }}
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
                )}
                </div>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Additional Product Images
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleMultipleImageUpload}
                  />
                </Button>
                <div>
                  {productImagesPaths.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {productImagesPaths.map((url, index) => (
                        <div key={index} style={{ position: "relative", display: "inline-block", width: 200, height: 200, marginRight: 8, marginBottom: 8 }}>
                          <img
                            src={url}
                            alt={`product-${index}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => {
                              const updatedImages = productImagesPaths.filter((_, i) => i !== index);
                              setProductImagesPaths(updatedImages);
                              setValue("productImages", updatedImages);
                            }}
                            style={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              backgroundColor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Grid>

              {/* Submit */}
              <Grid item xs={12} className="text-end">
                <Button variant="contained" type="submit" disabled={uploading}>
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

export default AddProduct;
