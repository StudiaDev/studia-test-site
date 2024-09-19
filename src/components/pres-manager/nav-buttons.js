import { Button } from "@/components/ui/button"

export default function PresentationManagerNavButtons() {
    return (
      <div className="presentation-manager-nav-buttons">
          <Button className="button-icon" variant="outline" size="icon">
            <img src="/images/chevron-left.svg" alt="Previous" />
          </Button>
          <Button className="button-icon" variant="outline" size="icon">
            <img src="/images/chevron-right.svg" alt="Next" />
          </Button>
      </div>
    )
  }