import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "./Button"
import { useEffect, useRef, useState } from "react"

type CategoryPillProps = {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

const TRANSLATE_AMOUNT = 200

const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) => {
  const [translate, setTranslate] = useState(0)
  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target
      if (container == null) return

      setIsLeftVisible(translate > 0)
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      )
    })

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [categories, translate])

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelect(category)}
            variant={selectedCategory === category ? "dark" : "default"}
            className="px-3 py-1 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 -translate-y-1/2 top-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT

                if (newTranslate <= 0) return 0
                return newTranslate
              })
            }}
            className="h-full aspect-square w-auto p-1.5"
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 -translate-y-1/2 top-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) return translate

                const newTranslate = translate + TRANSLATE_AMOUNT
                const scrollableWidth = containerRef.current.scrollWidth
                const visibleWidth = containerRef.current.clientWidth

                if (newTranslate + visibleWidth >= scrollableWidth) {
                  return scrollableWidth - visibleWidth
                }

                return newTranslate
              })
            }}
            className="h-full aspect-square w-auto p-1.5"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  )
}

export default CategoryPills
