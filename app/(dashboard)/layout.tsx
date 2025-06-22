import { Footer } from '@/components/footer';
import { Navbar } from '@/components/protected/navbar';

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header> */}
        <div
          className="
            h-screen
            bg-gradient-to-br from-[#eaf6ff] via-[#ffeedd] to-[#ffd9a0]
            bg-[length:200%_200%] animate-gradient-slow
            backdrop-blur-xl bg-white/30
            border border-white/20
            rounded-2xl
            overflow-y-scroll
            flex flex-col
          "
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}



// export default function Layout({
//   children
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <div className='h-full min-h-[calc(100vh_-_36px_-_48px)] py-10 px-4 w-full flex flex-col gap-y-10 items-center justify-center'>
//         <div className='w-full max-w-[600px] overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl'>
//           <div className='flex flex-col'>
//             <Navbar />
//             <div className='p-4 md:p-8'>{children}</div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
