export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  CalendarDay: any;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilter>;
};

export type CalendarDayFilter = {
  equals?: InputMaybe<Scalars['CalendarDay']>;
  gt?: InputMaybe<Scalars['CalendarDay']>;
  gte?: InputMaybe<Scalars['CalendarDay']>;
  in?: InputMaybe<Array<Scalars['CalendarDay']>>;
  lt?: InputMaybe<Scalars['CalendarDay']>;
  lte?: InputMaybe<Scalars['CalendarDay']>;
  not?: InputMaybe<CalendarDayFilter>;
  notIn?: InputMaybe<Array<Scalars['CalendarDay']>>;
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<CartItem>>;
  itemsCount?: Maybe<Scalars['Int']>;
  priceFa?: Maybe<Scalars['String']>;
  summery?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};


export type CartItemsArgs = {
  orderBy?: Array<CartItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CartItemWhereInput;
};


export type CartItemsCountArgs = {
  where?: CartItemWhereInput;
};

export type CartCreateInput = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  items?: InputMaybe<CartItemRelateToManyForCreateInput>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type CartItem = {
  __typename?: 'CartItem';
  cart?: Maybe<Cart>;
  coupon?: Maybe<Coupon>;
  course?: Maybe<Course>;
  id: Scalars['ID'];
  priceWithDiscount?: Maybe<Scalars['Float']>;
};

export type CartItemCreateInput = {
  cart?: InputMaybe<CartRelateToOneForCreateInput>;
  coupon?: InputMaybe<CouponRelateToOneForCreateInput>;
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
};

export type CartItemManyRelationFilter = {
  every?: InputMaybe<CartItemWhereInput>;
  none?: InputMaybe<CartItemWhereInput>;
  some?: InputMaybe<CartItemWhereInput>;
};

export type CartItemOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type CartItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  create?: InputMaybe<Array<CartItemCreateInput>>;
};

export type CartItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  create?: InputMaybe<Array<CartItemCreateInput>>;
  disconnect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  set?: InputMaybe<Array<CartItemWhereUniqueInput>>;
};

export type CartItemUpdateArgs = {
  data: CartItemUpdateInput;
  where: CartItemWhereUniqueInput;
};

export type CartItemUpdateInput = {
  cart?: InputMaybe<CartRelateToOneForUpdateInput>;
  coupon?: InputMaybe<CouponRelateToOneForUpdateInput>;
  course?: InputMaybe<CourseRelateToOneForUpdateInput>;
};

export type CartItemWhereInput = {
  AND?: InputMaybe<Array<CartItemWhereInput>>;
  NOT?: InputMaybe<Array<CartItemWhereInput>>;
  OR?: InputMaybe<Array<CartItemWhereInput>>;
  cart?: InputMaybe<CartWhereInput>;
  coupon?: InputMaybe<CouponWhereInput>;
  course?: InputMaybe<CourseWhereInput>;
  id?: InputMaybe<IdFilter>;
};

export type CartItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type CartManyRelationFilter = {
  every?: InputMaybe<CartWhereInput>;
  none?: InputMaybe<CartWhereInput>;
  some?: InputMaybe<CartWhereInput>;
};

export type CartOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  isCompleted?: InputMaybe<OrderDirection>;
};

export type CartRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CartWhereUniqueInput>>;
  create?: InputMaybe<Array<CartCreateInput>>;
};

export type CartRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CartWhereUniqueInput>>;
  create?: InputMaybe<Array<CartCreateInput>>;
  disconnect?: InputMaybe<Array<CartWhereUniqueInput>>;
  set?: InputMaybe<Array<CartWhereUniqueInput>>;
};

export type CartRelateToOneForCreateInput = {
  connect?: InputMaybe<CartWhereUniqueInput>;
  create?: InputMaybe<CartCreateInput>;
};

export type CartRelateToOneForUpdateInput = {
  connect?: InputMaybe<CartWhereUniqueInput>;
  create?: InputMaybe<CartCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type CartUpdateArgs = {
  data: CartUpdateInput;
  where: CartWhereUniqueInput;
};

export type CartUpdateInput = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  items?: InputMaybe<CartItemRelateToManyForUpdateInput>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type CartWhereInput = {
  AND?: InputMaybe<Array<CartWhereInput>>;
  NOT?: InputMaybe<Array<CartWhereInput>>;
  OR?: InputMaybe<Array<CartWhereInput>>;
  id?: InputMaybe<IdFilter>;
  isCompleted?: InputMaybe<BooleanFilter>;
  items?: InputMaybe<CartItemManyRelationFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CartWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Array<Category>>;
  parentIdCount?: Maybe<Scalars['Int']>;
};


export type CategoryParentIdArgs = {
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CategoryWhereInput;
};


export type CategoryParentIdCountArgs = {
  where?: CategoryWhereInput;
};

export type CategoryCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<CategoryRelateToManyForCreateInput>;
};

export type CategoryManyRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>;
  none?: InputMaybe<CategoryWhereInput>;
  some?: InputMaybe<CategoryWhereInput>;
};

export type CategoryOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type CategoryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
};

export type CategoryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
  disconnect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  set?: InputMaybe<Array<CategoryWhereUniqueInput>>;
};

export type CategoryUpdateArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<CategoryRelateToManyForUpdateInput>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  parentId?: InputMaybe<CategoryManyRelationFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Coupon = {
  __typename?: 'Coupon';
  belongsTo?: Maybe<Array<Course>>;
  belongsToCount?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['Int']>;
  couponItem?: Maybe<Array<CouponPivot>>;
  couponItemCount?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  maxAmount?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
};


export type CouponBelongsToArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type CouponBelongsToCountArgs = {
  where?: CourseWhereInput;
};


export type CouponCouponItemArgs = {
  orderBy?: Array<CouponPivotOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CouponPivotWhereInput;
};


export type CouponCouponItemCountArgs = {
  where?: CouponPivotWhereInput;
};

export type CouponCreateInput = {
  belongsTo?: InputMaybe<CourseRelateToManyForCreateInput>;
  code?: InputMaybe<Scalars['Int']>;
  couponItem?: InputMaybe<CouponPivotRelateToManyForCreateInput>;
  description?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Int']>;
  maxAmount?: InputMaybe<Scalars['Int']>;
};

export type CouponOrderByInput = {
  code?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  discount?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  maxAmount?: InputMaybe<OrderDirection>;
};

export type CouponPivot = {
  __typename?: 'CouponPivot';
  couponCode?: Maybe<Coupon>;
  customer?: Maybe<User>;
  id: Scalars['ID'];
  status?: Maybe<Scalars['Int']>;
};

export type CouponPivotCreateInput = {
  couponCode?: InputMaybe<CouponRelateToOneForCreateInput>;
  customer?: InputMaybe<UserRelateToOneForCreateInput>;
  status?: InputMaybe<Scalars['Int']>;
};

export type CouponPivotManyRelationFilter = {
  every?: InputMaybe<CouponPivotWhereInput>;
  none?: InputMaybe<CouponPivotWhereInput>;
  some?: InputMaybe<CouponPivotWhereInput>;
};

export type CouponPivotOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type CouponPivotRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CouponPivotWhereUniqueInput>>;
  create?: InputMaybe<Array<CouponPivotCreateInput>>;
};

export type CouponPivotRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CouponPivotWhereUniqueInput>>;
  create?: InputMaybe<Array<CouponPivotCreateInput>>;
  disconnect?: InputMaybe<Array<CouponPivotWhereUniqueInput>>;
  set?: InputMaybe<Array<CouponPivotWhereUniqueInput>>;
};

export type CouponPivotUpdateArgs = {
  data: CouponPivotUpdateInput;
  where: CouponPivotWhereUniqueInput;
};

export type CouponPivotUpdateInput = {
  couponCode?: InputMaybe<CouponRelateToOneForUpdateInput>;
  customer?: InputMaybe<UserRelateToOneForUpdateInput>;
  status?: InputMaybe<Scalars['Int']>;
};

export type CouponPivotWhereInput = {
  AND?: InputMaybe<Array<CouponPivotWhereInput>>;
  NOT?: InputMaybe<Array<CouponPivotWhereInput>>;
  OR?: InputMaybe<Array<CouponPivotWhereInput>>;
  couponCode?: InputMaybe<CouponWhereInput>;
  customer?: InputMaybe<UserWhereInput>;
  id?: InputMaybe<IdFilter>;
  status?: InputMaybe<IntNullableFilter>;
};

export type CouponPivotWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type CouponRelateToOneForCreateInput = {
  connect?: InputMaybe<CouponWhereUniqueInput>;
  create?: InputMaybe<CouponCreateInput>;
};

export type CouponRelateToOneForUpdateInput = {
  connect?: InputMaybe<CouponWhereUniqueInput>;
  create?: InputMaybe<CouponCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type CouponUpdateArgs = {
  data: CouponUpdateInput;
  where: CouponWhereUniqueInput;
};

export type CouponUpdateInput = {
  belongsTo?: InputMaybe<CourseRelateToManyForUpdateInput>;
  code?: InputMaybe<Scalars['Int']>;
  couponItem?: InputMaybe<CouponPivotRelateToManyForUpdateInput>;
  description?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Int']>;
  maxAmount?: InputMaybe<Scalars['Int']>;
};

export type CouponWhereInput = {
  AND?: InputMaybe<Array<CouponWhereInput>>;
  NOT?: InputMaybe<Array<CouponWhereInput>>;
  OR?: InputMaybe<Array<CouponWhereInput>>;
  belongsTo?: InputMaybe<CourseManyRelationFilter>;
  code?: InputMaybe<IntFilter>;
  couponItem?: InputMaybe<CouponPivotManyRelationFilter>;
  description?: InputMaybe<StringFilter>;
  discount?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  maxAmount?: InputMaybe<IntFilter>;
};

export type CouponWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Course = {
  __typename?: 'Course';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isAccessible?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  priceFa?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']>;
};


export type CourseUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: UserWhereInput;
};


export type CourseUsersCountArgs = {
  where?: UserWhereInput;
};

export type CourseCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<UserRelateToManyForCreateInput>;
};

export type CourseManyRelationFilter = {
  every?: InputMaybe<CourseWhereInput>;
  none?: InputMaybe<CourseWhereInput>;
  some?: InputMaybe<CourseWhereInput>;
};

export type CourseOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type CourseRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseCreateInput>>;
};

export type CourseRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseCreateInput>>;
  disconnect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  set?: InputMaybe<Array<CourseWhereUniqueInput>>;
};

export type CourseRelateToOneForCreateInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  create?: InputMaybe<CourseCreateInput>;
};

export type CourseRelateToOneForUpdateInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  create?: InputMaybe<CourseCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type CourseUpdateArgs = {
  data: CourseUpdateInput;
  where: CourseWhereUniqueInput;
};

export type CourseUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<UserRelateToManyForUpdateInput>;
};

export type CourseWhereInput = {
  AND?: InputMaybe<Array<CourseWhereInput>>;
  NOT?: InputMaybe<Array<CourseWhereInput>>;
  OR?: InputMaybe<Array<CourseWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  price?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<StringNullableFilter>;
  users?: InputMaybe<UserManyRelationFilter>;
};

export type CourseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type Image = {
  __typename?: 'Image';
  altText?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image?: Maybe<ImageFieldOutput>;
  uploadedBy?: Maybe<User>;
};

export type ImageCreateInput = {
  altText?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  image?: InputMaybe<ImageFieldInput>;
  uploadedBy?: InputMaybe<UserRelateToOneForCreateInput>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  upload: Scalars['Upload'];
};

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type ImageManyRelationFilter = {
  every?: InputMaybe<ImageWhereInput>;
  none?: InputMaybe<ImageWhereInput>;
  some?: InputMaybe<ImageWhereInput>;
};

export type ImageOrderByInput = {
  altText?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
};

export type ImageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  create?: InputMaybe<Array<ImageCreateInput>>;
};

export type ImageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  create?: InputMaybe<Array<ImageCreateInput>>;
  disconnect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  set?: InputMaybe<Array<ImageWhereUniqueInput>>;
};

export type ImageUpdateArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpdateInput = {
  altText?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  image?: InputMaybe<ImageFieldInput>;
  uploadedBy?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type ImageWhereInput = {
  AND?: InputMaybe<Array<ImageWhereInput>>;
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  OR?: InputMaybe<Array<ImageWhereInput>>;
  altText?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  uploadedBy?: InputMaybe<UserWhereInput>;
};

export type ImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  fieldMeta?: Maybe<Scalars['JSON']>;
  isFilterable: Scalars['Boolean'];
  isOrderable: Scalars['Boolean'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean'];
  hideDelete: Scalars['Boolean'];
  initialColumns: Array<Scalars['String']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean'];
  isSingleton: Scalars['Boolean'];
  itemQueryName: Scalars['String'];
  key: Scalars['String'];
  label: Scalars['String'];
  labelField: Scalars['String'];
  listQueryName: Scalars['String'];
  pageSize: Scalars['Int'];
  path: Scalars['String'];
  plural: Scalars['String'];
  singular: Scalars['String'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createCart?: Maybe<Cart>;
  createCartItem?: Maybe<CartItem>;
  createCartItems?: Maybe<Array<Maybe<CartItem>>>;
  createCarts?: Maybe<Array<Maybe<Cart>>>;
  createCategories?: Maybe<Array<Maybe<Category>>>;
  createCategory?: Maybe<Category>;
  createCoupon?: Maybe<Coupon>;
  createCouponPivot?: Maybe<CouponPivot>;
  createCouponPivots?: Maybe<Array<Maybe<CouponPivot>>>;
  createCoupons?: Maybe<Array<Maybe<Coupon>>>;
  createCourse?: Maybe<Course>;
  createCourses?: Maybe<Array<Maybe<Course>>>;
  createImage?: Maybe<Image>;
  createImages?: Maybe<Array<Maybe<Image>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createManySettings?: Maybe<Array<Maybe<Settings>>>;
  createOrder?: Maybe<Order>;
  createOrderItem?: Maybe<OrderItem>;
  createOrderItems?: Maybe<Array<Maybe<OrderItem>>>;
  createOrders?: Maybe<Array<Maybe<Order>>>;
  createPost?: Maybe<Post>;
  createPosts?: Maybe<Array<Maybe<Post>>>;
  createSettings?: Maybe<Settings>;
  createTag?: Maybe<Tag>;
  createTags?: Maybe<Array<Maybe<Tag>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteCart?: Maybe<Cart>;
  deleteCartItem?: Maybe<CartItem>;
  deleteCartItems?: Maybe<Array<Maybe<CartItem>>>;
  deleteCarts?: Maybe<Array<Maybe<Cart>>>;
  deleteCategories?: Maybe<Array<Maybe<Category>>>;
  deleteCategory?: Maybe<Category>;
  deleteCoupon?: Maybe<Coupon>;
  deleteCouponPivot?: Maybe<CouponPivot>;
  deleteCouponPivots?: Maybe<Array<Maybe<CouponPivot>>>;
  deleteCoupons?: Maybe<Array<Maybe<Coupon>>>;
  deleteCourse?: Maybe<Course>;
  deleteCourses?: Maybe<Array<Maybe<Course>>>;
  deleteImage?: Maybe<Image>;
  deleteImages?: Maybe<Array<Maybe<Image>>>;
  deleteManySettings?: Maybe<Array<Maybe<Settings>>>;
  deleteOrder?: Maybe<Order>;
  deleteOrderItem?: Maybe<OrderItem>;
  deleteOrderItems?: Maybe<Array<Maybe<OrderItem>>>;
  deleteOrders?: Maybe<Array<Maybe<Order>>>;
  deletePost?: Maybe<Post>;
  deletePosts?: Maybe<Array<Maybe<Post>>>;
  deleteSettings?: Maybe<Settings>;
  deleteTag?: Maybe<Tag>;
  deleteTags?: Maybe<Array<Maybe<Tag>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean'];
  redeemUserPasswordResetToken?: Maybe<RedeemUserPasswordResetTokenResult>;
  sendUserPasswordResetLink: Scalars['Boolean'];
  updateCart?: Maybe<Cart>;
  updateCartItem?: Maybe<CartItem>;
  updateCartItems?: Maybe<Array<Maybe<CartItem>>>;
  updateCarts?: Maybe<Array<Maybe<Cart>>>;
  updateCategories?: Maybe<Array<Maybe<Category>>>;
  updateCategory?: Maybe<Category>;
  updateCoupon?: Maybe<Coupon>;
  updateCouponPivot?: Maybe<CouponPivot>;
  updateCouponPivots?: Maybe<Array<Maybe<CouponPivot>>>;
  updateCoupons?: Maybe<Array<Maybe<Coupon>>>;
  updateCourse?: Maybe<Course>;
  updateCourses?: Maybe<Array<Maybe<Course>>>;
  updateImage?: Maybe<Image>;
  updateImages?: Maybe<Array<Maybe<Image>>>;
  updateManySettings?: Maybe<Array<Maybe<Settings>>>;
  updateOrder?: Maybe<Order>;
  updateOrderItem?: Maybe<OrderItem>;
  updateOrderItems?: Maybe<Array<Maybe<OrderItem>>>;
  updateOrders?: Maybe<Array<Maybe<Order>>>;
  updatePost?: Maybe<Post>;
  updatePosts?: Maybe<Array<Maybe<Post>>>;
  updateSettings?: Maybe<Settings>;
  updateTag?: Maybe<Tag>;
  updateTags?: Maybe<Array<Maybe<Tag>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateCartArgs = {
  data: CartCreateInput;
};


export type MutationCreateCartItemArgs = {
  data: CartItemCreateInput;
};


export type MutationCreateCartItemsArgs = {
  data: Array<CartItemCreateInput>;
};


export type MutationCreateCartsArgs = {
  data: Array<CartCreateInput>;
};


export type MutationCreateCategoriesArgs = {
  data: Array<CategoryCreateInput>;
};


export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateCouponArgs = {
  data: CouponCreateInput;
};


export type MutationCreateCouponPivotArgs = {
  data: CouponPivotCreateInput;
};


export type MutationCreateCouponPivotsArgs = {
  data: Array<CouponPivotCreateInput>;
};


export type MutationCreateCouponsArgs = {
  data: Array<CouponCreateInput>;
};


export type MutationCreateCourseArgs = {
  data: CourseCreateInput;
};


export type MutationCreateCoursesArgs = {
  data: Array<CourseCreateInput>;
};


export type MutationCreateImageArgs = {
  data: ImageCreateInput;
};


export type MutationCreateImagesArgs = {
  data: Array<ImageCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateManySettingsArgs = {
  data: Array<SettingsCreateInput>;
};


export type MutationCreateOrderArgs = {
  data: OrderCreateInput;
};


export type MutationCreateOrderItemArgs = {
  data: OrderItemCreateInput;
};


export type MutationCreateOrderItemsArgs = {
  data: Array<OrderItemCreateInput>;
};


export type MutationCreateOrdersArgs = {
  data: Array<OrderCreateInput>;
};


export type MutationCreatePostArgs = {
  data: PostCreateInput;
};


export type MutationCreatePostsArgs = {
  data: Array<PostCreateInput>;
};


export type MutationCreateSettingsArgs = {
  data: SettingsCreateInput;
};


export type MutationCreateTagArgs = {
  data: TagCreateInput;
};


export type MutationCreateTagsArgs = {
  data: Array<TagCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteCartArgs = {
  where: CartWhereUniqueInput;
};


export type MutationDeleteCartItemArgs = {
  where: CartItemWhereUniqueInput;
};


export type MutationDeleteCartItemsArgs = {
  where: Array<CartItemWhereUniqueInput>;
};


export type MutationDeleteCartsArgs = {
  where: Array<CartWhereUniqueInput>;
};


export type MutationDeleteCategoriesArgs = {
  where: Array<CategoryWhereUniqueInput>;
};


export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteCouponArgs = {
  where: CouponWhereUniqueInput;
};


export type MutationDeleteCouponPivotArgs = {
  where: CouponPivotWhereUniqueInput;
};


export type MutationDeleteCouponPivotsArgs = {
  where: Array<CouponPivotWhereUniqueInput>;
};


export type MutationDeleteCouponsArgs = {
  where: Array<CouponWhereUniqueInput>;
};


export type MutationDeleteCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type MutationDeleteCoursesArgs = {
  where: Array<CourseWhereUniqueInput>;
};


export type MutationDeleteImageArgs = {
  where: ImageWhereUniqueInput;
};


export type MutationDeleteImagesArgs = {
  where: Array<ImageWhereUniqueInput>;
};


export type MutationDeleteManySettingsArgs = {
  where: Array<SettingsWhereUniqueInput>;
};


export type MutationDeleteOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOrderItemArgs = {
  where: OrderItemWhereUniqueInput;
};


export type MutationDeleteOrderItemsArgs = {
  where: Array<OrderItemWhereUniqueInput>;
};


export type MutationDeleteOrdersArgs = {
  where: Array<OrderWhereUniqueInput>;
};


export type MutationDeletePostArgs = {
  where: PostWhereUniqueInput;
};


export type MutationDeletePostsArgs = {
  where: Array<PostWhereUniqueInput>;
};


export type MutationDeleteSettingsArgs = {
  where?: SettingsWhereUniqueInput;
};


export type MutationDeleteTagArgs = {
  where: TagWhereUniqueInput;
};


export type MutationDeleteTagsArgs = {
  where: Array<TagWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationRedeemUserPasswordResetTokenArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendUserPasswordResetLinkArgs = {
  email: Scalars['String'];
};


export type MutationUpdateCartArgs = {
  data: CartUpdateInput;
  where: CartWhereUniqueInput;
};


export type MutationUpdateCartItemArgs = {
  data: CartItemUpdateInput;
  where: CartItemWhereUniqueInput;
};


export type MutationUpdateCartItemsArgs = {
  data: Array<CartItemUpdateArgs>;
};


export type MutationUpdateCartsArgs = {
  data: Array<CartUpdateArgs>;
};


export type MutationUpdateCategoriesArgs = {
  data: Array<CategoryUpdateArgs>;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateCouponArgs = {
  data: CouponUpdateInput;
  where: CouponWhereUniqueInput;
};


export type MutationUpdateCouponPivotArgs = {
  data: CouponPivotUpdateInput;
  where: CouponPivotWhereUniqueInput;
};


export type MutationUpdateCouponPivotsArgs = {
  data: Array<CouponPivotUpdateArgs>;
};


export type MutationUpdateCouponsArgs = {
  data: Array<CouponUpdateArgs>;
};


export type MutationUpdateCourseArgs = {
  data: CourseUpdateInput;
  where: CourseWhereUniqueInput;
};


export type MutationUpdateCoursesArgs = {
  data: Array<CourseUpdateArgs>;
};


export type MutationUpdateImageArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};


export type MutationUpdateImagesArgs = {
  data: Array<ImageUpdateArgs>;
};


export type MutationUpdateManySettingsArgs = {
  data: Array<SettingsUpdateArgs>;
};


export type MutationUpdateOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOrderItemArgs = {
  data: OrderItemUpdateInput;
  where: OrderItemWhereUniqueInput;
};


export type MutationUpdateOrderItemsArgs = {
  data: Array<OrderItemUpdateArgs>;
};


export type MutationUpdateOrdersArgs = {
  data: Array<OrderUpdateArgs>;
};


export type MutationUpdatePostArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};


export type MutationUpdatePostsArgs = {
  data: Array<PostUpdateArgs>;
};


export type MutationUpdateSettingsArgs = {
  data: SettingsUpdateInput;
  where?: SettingsWhereUniqueInput;
};


export type MutationUpdateTagArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};


export type MutationUpdateTagsArgs = {
  data: Array<TagUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  items?: Maybe<Array<OrderItem>>;
  itemsCount?: Maybe<Scalars['Int']>;
  orderDate?: Maybe<Scalars['DateTime']>;
  paymentStatus?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  totalCost?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};


export type OrderItemsArgs = {
  orderBy?: Array<OrderItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderItemWhereInput;
};


export type OrderItemsCountArgs = {
  where?: OrderItemWhereInput;
};

export type OrderCreateInput = {
  items?: InputMaybe<OrderItemRelateToManyForCreateInput>;
  orderDate?: InputMaybe<Scalars['DateTime']>;
  paymentStatus?: InputMaybe<Scalars['Int']>;
  total?: InputMaybe<Scalars['Int']>;
  totalCost?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderItem = {
  __typename?: 'OrderItem';
  course?: Maybe<Course>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  price?: Maybe<Scalars['Int']>;
};

export type OrderItemCreateInput = {
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  price?: InputMaybe<Scalars['Int']>;
};

export type OrderItemManyRelationFilter = {
  every?: InputMaybe<OrderItemWhereInput>;
  none?: InputMaybe<OrderItemWhereInput>;
  some?: InputMaybe<OrderItemWhereInput>;
};

export type OrderItemOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
};

export type OrderItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderItemCreateInput>>;
};

export type OrderItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderItemCreateInput>>;
  disconnect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
};

export type OrderItemUpdateArgs = {
  data: OrderItemUpdateInput;
  where: OrderItemWhereUniqueInput;
};

export type OrderItemUpdateInput = {
  course?: InputMaybe<CourseRelateToOneForUpdateInput>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<OrderRelateToOneForUpdateInput>;
  price?: InputMaybe<Scalars['Int']>;
};

export type OrderItemWhereInput = {
  AND?: InputMaybe<Array<OrderItemWhereInput>>;
  NOT?: InputMaybe<Array<OrderItemWhereInput>>;
  OR?: InputMaybe<Array<OrderItemWhereInput>>;
  course?: InputMaybe<CourseWhereInput>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderWhereInput>;
  price?: InputMaybe<IntNullableFilter>;
};

export type OrderItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type OrderManyRelationFilter = {
  every?: InputMaybe<OrderWhereInput>;
  none?: InputMaybe<OrderWhereInput>;
  some?: InputMaybe<OrderWhereInput>;
};

export type OrderOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  orderDate?: InputMaybe<OrderDirection>;
  paymentStatus?: InputMaybe<OrderDirection>;
  total?: InputMaybe<OrderDirection>;
  totalCost?: InputMaybe<OrderDirection>;
};

export type OrderRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
};

export type OrderRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
  disconnect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderWhereUniqueInput>>;
};

export type OrderRelateToOneForCreateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
};

export type OrderRelateToOneForUpdateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type OrderUpdateArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpdateInput = {
  items?: InputMaybe<OrderItemRelateToManyForUpdateInput>;
  orderDate?: InputMaybe<Scalars['DateTime']>;
  paymentStatus?: InputMaybe<Scalars['Int']>;
  total?: InputMaybe<Scalars['Int']>;
  totalCost?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  id?: InputMaybe<IdFilter>;
  items?: InputMaybe<OrderItemManyRelationFilter>;
  orderDate?: InputMaybe<DateTimeNullableFilter>;
  paymentStatus?: InputMaybe<IntNullableFilter>;
  total?: InputMaybe<IntNullableFilter>;
  totalCost?: InputMaybe<IntNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type OrderWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type PasswordFilter = {
  isSet: Scalars['Boolean'];
};

export enum PasswordResetRedemptionErrorCode {
  Failure = 'FAILURE',
  TokenExpired = 'TOKEN_EXPIRED',
  TokenRedeemed = 'TOKEN_REDEEMED'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Post_Content_Document>;
  example?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  someFieldName?: Maybe<Scalars['CalendarDay']>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type PostTagsArgs = {
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: TagWhereInput;
};


export type PostTagsCountArgs = {
  where?: TagWhereInput;
};

export type PostCreateInput = {
  author?: InputMaybe<UserRelateToOneForCreateInput>;
  content?: InputMaybe<Scalars['JSON']>;
  example?: InputMaybe<Scalars['String']>;
  someFieldName?: InputMaybe<Scalars['CalendarDay']>;
  tags?: InputMaybe<TagRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type PostManyRelationFilter = {
  every?: InputMaybe<PostWhereInput>;
  none?: InputMaybe<PostWhereInput>;
  some?: InputMaybe<PostWhereInput>;
};

export type PostOrderByInput = {
  example?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  someFieldName?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type PostRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  create?: InputMaybe<Array<PostCreateInput>>;
};

export type PostRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
};

export type PostUpdateArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateInput = {
  author?: InputMaybe<UserRelateToOneForUpdateInput>;
  content?: InputMaybe<Scalars['JSON']>;
  example?: InputMaybe<Scalars['String']>;
  someFieldName?: InputMaybe<Scalars['CalendarDay']>;
  tags?: InputMaybe<TagRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  author?: InputMaybe<UserWhereInput>;
  id?: InputMaybe<IdFilter>;
  someFieldName?: InputMaybe<CalendarDayFilter>;
  tags?: InputMaybe<TagManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  someFieldName?: InputMaybe<Scalars['CalendarDay']>;
};

export type Post_Content_Document = {
  __typename?: 'Post_content_Document';
  document: Scalars['JSON'];
};


export type Post_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  cart?: Maybe<Cart>;
  cartItem?: Maybe<CartItem>;
  cartItems?: Maybe<Array<CartItem>>;
  cartItemsCount?: Maybe<Scalars['Int']>;
  carts?: Maybe<Array<Cart>>;
  cartsCount?: Maybe<Scalars['Int']>;
  categories?: Maybe<Array<Category>>;
  categoriesCount?: Maybe<Scalars['Int']>;
  category?: Maybe<Category>;
  coupon?: Maybe<Coupon>;
  couponPivot?: Maybe<CouponPivot>;
  couponPivots?: Maybe<Array<CouponPivot>>;
  couponPivotsCount?: Maybe<Scalars['Int']>;
  coupons?: Maybe<Array<Coupon>>;
  couponsCount?: Maybe<Scalars['Int']>;
  course?: Maybe<Course>;
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']>;
  image?: Maybe<Image>;
  images?: Maybe<Array<Image>>;
  imagesCount?: Maybe<Scalars['Int']>;
  keystone: KeystoneMeta;
  manySettings?: Maybe<Array<Settings>>;
  manySettingsCount?: Maybe<Scalars['Int']>;
  order?: Maybe<Order>;
  orderItem?: Maybe<OrderItem>;
  orderItems?: Maybe<Array<OrderItem>>;
  orderItemsCount?: Maybe<Scalars['Int']>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']>;
  settings?: Maybe<Settings>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']>;
  validateUserPasswordResetToken?: Maybe<ValidateUserPasswordResetTokenResult>;
};


export type QueryCartArgs = {
  where: CartWhereUniqueInput;
};


export type QueryCartItemArgs = {
  where: CartItemWhereUniqueInput;
};


export type QueryCartItemsArgs = {
  orderBy?: Array<CartItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CartItemWhereInput;
};


export type QueryCartItemsCountArgs = {
  where?: CartItemWhereInput;
};


export type QueryCartsArgs = {
  orderBy?: Array<CartOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CartWhereInput;
};


export type QueryCartsCountArgs = {
  where?: CartWhereInput;
};


export type QueryCategoriesArgs = {
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CategoryWhereInput;
};


export type QueryCategoriesCountArgs = {
  where?: CategoryWhereInput;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryCouponArgs = {
  where: CouponWhereUniqueInput;
};


export type QueryCouponPivotArgs = {
  where: CouponPivotWhereUniqueInput;
};


export type QueryCouponPivotsArgs = {
  orderBy?: Array<CouponPivotOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CouponPivotWhereInput;
};


export type QueryCouponPivotsCountArgs = {
  where?: CouponPivotWhereInput;
};


export type QueryCouponsArgs = {
  orderBy?: Array<CouponOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CouponWhereInput;
};


export type QueryCouponsCountArgs = {
  where?: CouponWhereInput;
};


export type QueryCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type QueryCoursesArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type QueryCoursesCountArgs = {
  where?: CourseWhereInput;
};


export type QueryImageArgs = {
  where: ImageWhereUniqueInput;
};


export type QueryImagesArgs = {
  orderBy?: Array<ImageOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: ImageWhereInput;
};


export type QueryImagesCountArgs = {
  where?: ImageWhereInput;
};


export type QueryManySettingsArgs = {
  orderBy?: Array<SettingsOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: SettingsWhereInput;
};


export type QueryManySettingsCountArgs = {
  where?: SettingsWhereInput;
};


export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type QueryOrderItemArgs = {
  where: OrderItemWhereUniqueInput;
};


export type QueryOrderItemsArgs = {
  orderBy?: Array<OrderItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderItemWhereInput;
};


export type QueryOrderItemsCountArgs = {
  where?: OrderItemWhereInput;
};


export type QueryOrdersArgs = {
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderWhereInput;
};


export type QueryOrdersCountArgs = {
  where?: OrderWhereInput;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryPostsArgs = {
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: PostWhereInput;
};


export type QueryPostsCountArgs = {
  where?: PostWhereInput;
};


export type QuerySettingsArgs = {
  where?: SettingsWhereUniqueInput;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryTagsArgs = {
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: TagWhereInput;
};


export type QueryTagsCountArgs = {
  where?: TagWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};


export type QueryValidateUserPasswordResetTokenArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RedeemUserPasswordResetTokenResult = {
  __typename?: 'RedeemUserPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  copyrightText?: Maybe<Scalars['String']>;
  highlightedPosts?: Maybe<Array<Post>>;
  highlightedPostsCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  jobsList?: Maybe<Array<Scalars['String']>>;
  websiteName?: Maybe<Scalars['String']>;
};


export type SettingsHighlightedPostsArgs = {
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: PostWhereInput;
};


export type SettingsHighlightedPostsCountArgs = {
  where?: PostWhereInput;
};

export type SettingsCreateInput = {
  copyrightText?: InputMaybe<Scalars['String']>;
  highlightedPosts?: InputMaybe<PostRelateToManyForCreateInput>;
  jobsList?: InputMaybe<Array<Scalars['String']>>;
  websiteName?: InputMaybe<Scalars['String']>;
};

export type SettingsOrderByInput = {
  copyrightText?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  websiteName?: InputMaybe<OrderDirection>;
};

export type SettingsUpdateArgs = {
  data: SettingsUpdateInput;
  where?: SettingsWhereUniqueInput;
};

export type SettingsUpdateInput = {
  copyrightText?: InputMaybe<Scalars['String']>;
  highlightedPosts?: InputMaybe<PostRelateToManyForUpdateInput>;
  jobsList?: InputMaybe<Array<Scalars['String']>>;
  websiteName?: InputMaybe<Scalars['String']>;
};

export type SettingsWhereInput = {
  AND?: InputMaybe<Array<SettingsWhereInput>>;
  NOT?: InputMaybe<Array<SettingsWhereInput>>;
  OR?: InputMaybe<Array<SettingsWhereInput>>;
  copyrightText?: InputMaybe<StringFilter>;
  highlightedPosts?: InputMaybe<PostManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  websiteName?: InputMaybe<StringFilter>;
};

export type SettingsWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']>;
};


export type TagPostsArgs = {
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: PostWhereInput;
};


export type TagPostsCountArgs = {
  where?: PostWhereInput;
};

export type TagCreateInput = {
  name?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostRelateToManyForCreateInput>;
};

export type TagManyRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type TagRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
};

export type TagRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
};

export type TagUpdateArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostRelateToManyForUpdateInput>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostManyRelationFilter>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  cart?: Maybe<Array<Cart>>;
  cartCount?: Maybe<Scalars['Int']>;
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Image>>;
  imagesCount?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']>;
  password?: Maybe<PasswordState>;
  passwordResetIssuedAt?: Maybe<Scalars['DateTime']>;
  passwordResetRedeemedAt?: Maybe<Scalars['DateTime']>;
  passwordResetToken?: Maybe<PasswordState>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
};


export type UserCartArgs = {
  orderBy?: Array<CartOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CartWhereInput;
};


export type UserCartCountArgs = {
  where?: CartWhereInput;
};


export type UserCoursesArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type UserCoursesCountArgs = {
  where?: CourseWhereInput;
};


export type UserImagesArgs = {
  orderBy?: Array<ImageOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: ImageWhereInput;
};


export type UserImagesCountArgs = {
  where?: ImageWhereInput;
};


export type UserOrdersArgs = {
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderWhereInput;
};


export type UserOrdersCountArgs = {
  where?: OrderWhereInput;
};


export type UserPostsArgs = {
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: PostWhereInput;
};


export type UserPostsCountArgs = {
  where?: PostWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String'];
};

export type UserCreateInput = {
  cart?: InputMaybe<CartRelateToManyForCreateInput>;
  courses?: InputMaybe<CourseRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageRelateToManyForCreateInput>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orders?: InputMaybe<OrderRelateToManyForCreateInput>;
  password?: InputMaybe<Scalars['String']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetToken?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostRelateToManyForCreateInput>;
  role?: InputMaybe<Scalars['String']>;
};

export type UserManyRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  passwordResetIssuedAt?: InputMaybe<OrderDirection>;
  passwordResetRedeemedAt?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
};

export type UserRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
};

export type UserRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  cart?: InputMaybe<CartRelateToManyForUpdateInput>;
  courses?: InputMaybe<CourseRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageRelateToManyForUpdateInput>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orders?: InputMaybe<OrderRelateToManyForUpdateInput>;
  password?: InputMaybe<Scalars['String']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetToken?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostRelateToManyForUpdateInput>;
  role?: InputMaybe<Scalars['String']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  cart?: InputMaybe<CartManyRelationFilter>;
  courses?: InputMaybe<CourseManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  images?: InputMaybe<ImageManyRelationFilter>;
  lastName?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  orders?: InputMaybe<OrderManyRelationFilter>;
  passwordResetIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetToken?: InputMaybe<PasswordFilter>;
  posts?: InputMaybe<PostManyRelationFilter>;
  role?: InputMaybe<StringNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ValidateUserPasswordResetTokenResult = {
  __typename?: 'ValidateUserPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String'];
};

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninMutation = { __typename?: 'Mutation', authenticateUserWithPassword?: { __typename?: 'UserAuthenticationWithPasswordFailure', message: string } | { __typename?: 'UserAuthenticationWithPasswordSuccess', sessionToken: string, item: { __typename?: 'User', id: string, lastName?: string | null, name?: string | null, email?: string | null } } | null };

export type AuthitemQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthitemQuery = { __typename?: 'Query', authenticatedItem?: { __typename?: 'User', id: string, email?: string | null, name?: string | null, lastName?: string | null } | null };
