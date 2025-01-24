import { baseApi } from "@/redux/api/baseApi";
import { TOfferedCourse, TQueryParams, TResponseRedux } from "@/types";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["offered-course"],
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offered-course"],
    }),
  }),
});

export const { useGetAllOfferedCoursesQuery, useEnrollCourseMutation } = studentCourseApi;