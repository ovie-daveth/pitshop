import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function BreadCrumb() {
  const pathname = usePathname();

  // Split the pathname into segments and filter out empty strings
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Create breadcrumb items
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      label,
      href,
      isLast: index === pathSegments.length - 1,
    };
  });

  return (
    <nav
      className=" items-center md:flex whitespace-nowrap py-4 md:whitespace-normal hidden"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {crumb.isLast ? (
              <span className="text-gray-500 text-sm font-medium truncate max-w-[150px] md:max-w-none">
                {crumb.label}
              </span>
            ) : (
              <>
                <Link
                  href={crumb.href}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium truncate max-w-[150px] md:max-w-none"
                >
                  {crumb.label}
                </Link>
                <FiChevronRight
                  className="mx-2 h-4 w-4 text-gray-400 flex-shrink-0"
                  aria-hidden="true"
                />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}