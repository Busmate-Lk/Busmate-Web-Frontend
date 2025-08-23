import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface NavigationBreadcrumbProps {
  items: BreadcrumbItem[]
}

export function NavigationBreadcrumb({ items }: NavigationBreadcrumbProps) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span>{">"}</span>}
        </div>
      ))}
    </div>
  )
}
