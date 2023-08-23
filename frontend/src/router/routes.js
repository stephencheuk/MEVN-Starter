const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "databind", component: () => import("pages/DataBind.vue") },
      { path: "inputfield", component: () => import("pages/InputField.vue") },
      { path: "datatable", component: () => import("pages/DataTable.vue") },
      {
        path: "dbdatatable",
        children: [
          { path: "", component: () => import("pages/DBDataTable.vue") },
          {
            path: "edit/:id",
            component: () => import("pages/DBDataTableEdit.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
