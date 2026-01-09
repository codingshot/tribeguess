import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllReligions, TraditionalReligionData } from "@/data/traditionalReligions";
import { useSearchParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Sparkles, BookOpen, Users, Star, Heart, 
  Church, Scale, Plus, X, ChevronDown, Check
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const MAX_COMPARE = 4;

export default function ReligionCompare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const allReligions = getAllReligions();
  
  // Get selected religion IDs from URL params
  const selectedIds = useMemo(() => {
    const ids = searchParams.get("ids")?.split(",").filter(Boolean) || [];
    return ids.slice(0, MAX_COMPARE);
  }, [searchParams]);

  const selectedReligions = useMemo(() => {
    return selectedIds
      .map(id => allReligions.find(r => r.id === id))
      .filter((r): r is TraditionalReligionData => r !== undefined);
  }, [selectedIds, allReligions]);

  const availableReligions = allReligions.filter(r => !selectedIds.includes(r.id));

  const addReligion = (id: string) => {
    if (selectedIds.length >= MAX_COMPARE) return;
    const newIds = [...selectedIds, id];
    setSearchParams({ ids: newIds.join(",") });
  };

  const removeReligion = (id: string) => {
    const newIds = selectedIds.filter(i => i !== id);
    setSearchParams(newIds.length ? { ids: newIds.join(",") } : {});
  };

  const clearAll = () => {
    setSearchParams({});
  };

  return (
    <>
      <Helmet>
        <title>Compare African Religions | TribeGuess</title>
        <meta name="description" content="Compare tenets, practices, and rituals of African traditional religions side by side." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link 
              to="/religions"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to religions
            </Link>
          </nav>

          {/* Hero */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Scale className="h-8 w-8 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Compare Religions
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select up to {MAX_COMPARE} religions to compare their tenets, practices, and rituals side by side.
            </p>
          </div>

          {/* Selection Bar */}
          <div className="bg-secondary rounded-xl p-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              {selectedReligions.map((r) => (
                <Badge 
                  key={r.id} 
                  variant="default" 
                  className="flex items-center gap-2 py-2 px-3 text-sm"
                >
                  {r.name}
                  <button 
                    onClick={() => removeReligion(r.id)}
                    className="hover:bg-primary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              
              {selectedIds.length < MAX_COMPARE && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add religion
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2 max-h-80 overflow-y-auto">
                    {availableReligions.length === 0 ? (
                      <p className="text-sm text-muted-foreground p-2">All religions selected</p>
                    ) : (
                      <div className="space-y-1">
                        {availableReligions.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => addReligion(r.id)}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                          >
                            {r.name}
                            <span className="text-xs text-muted-foreground block">{r.region}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              )}

              {selectedIds.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {/* Empty State */}
          {selectedReligions.length === 0 && (
            <div className="text-center py-16 bg-secondary/50 rounded-xl">
              <Scale className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No religions selected</h2>
              <p className="text-muted-foreground mb-6">
                Add religions to compare their beliefs, practices, and rituals.
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Select first religion
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2 max-h-80 overflow-y-auto">
                  <div className="space-y-1">
                    {allReligions.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => addReligion(r.id)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                      >
                        {r.name}
                        <span className="text-xs text-muted-foreground block">{r.region}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Comparison Grid */}
          {selectedReligions.length > 0 && (
            <div className="space-y-8">
              {/* Overview Row */}
              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Overview
                </h2>
                <div className={cn(
                  "grid gap-4",
                  selectedReligions.length === 1 && "grid-cols-1",
                  selectedReligions.length === 2 && "grid-cols-1 md:grid-cols-2",
                  selectedReligions.length === 3 && "grid-cols-1 md:grid-cols-3",
                  selectedReligions.length === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                )}>
                  {selectedReligions.map((r) => (
                    <Card key={r.id} className="border-primary/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-primary">{r.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div>
                          <span className="text-muted-foreground">Region:</span> {r.region}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Followers:</span> {r.estimatedFollowers}
                        </div>
                        <Link 
                          to={`/religion/${r.id}`}
                          className="text-xs text-primary hover:underline inline-block mt-2"
                        >
                          View full details →
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Supreme Deity */}
              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Supreme Deity
                </h2>
                <div className={cn(
                  "grid gap-4",
                  selectedReligions.length === 1 && "grid-cols-1",
                  selectedReligions.length === 2 && "grid-cols-1 md:grid-cols-2",
                  selectedReligions.length === 3 && "grid-cols-1 md:grid-cols-3",
                  selectedReligions.length === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                )}>
                  {selectedReligions.map((r) => (
                    <Card key={r.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{r.supremeDeity.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="text-muted-foreground mb-3 line-clamp-4">{r.supremeDeity.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {r.supremeDeity.attributes.slice(0, 3).map((a, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{a}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Core Tenets */}
              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Core Tenets
                </h2>
                <div className={cn(
                  "grid gap-4",
                  selectedReligions.length === 1 && "grid-cols-1",
                  selectedReligions.length === 2 && "grid-cols-1 md:grid-cols-2",
                  selectedReligions.length === 3 && "grid-cols-1 md:grid-cols-3",
                  selectedReligions.length === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                )}>
                  {selectedReligions.map((r) => (
                    <Card key={r.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">{r.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {r.tenets.slice(0, 4).map((t, i) => (
                            <li key={i} className="text-sm">
                              <span className="font-medium text-foreground">{t.belief}</span>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{t.description}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Practices */}
              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Key Practices
                </h2>
                <div className={cn(
                  "grid gap-4",
                  selectedReligions.length === 1 && "grid-cols-1",
                  selectedReligions.length === 2 && "grid-cols-1 md:grid-cols-2",
                  selectedReligions.length === 3 && "grid-cols-1 md:grid-cols-3",
                  selectedReligions.length === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                )}>
                  {selectedReligions.map((r) => (
                    <Card key={r.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">{r.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {r.practices.slice(0, 4).map((p, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <Check className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                              <span>{p.name}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Rituals */}
              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Church className="w-5 h-5 text-primary" />
                  Key Rituals
                </h2>
                <div className={cn(
                  "grid gap-4",
                  selectedReligions.length === 1 && "grid-cols-1",
                  selectedReligions.length === 2 && "grid-cols-1 md:grid-cols-2",
                  selectedReligions.length === 3 && "grid-cols-1 md:grid-cols-3",
                  selectedReligions.length === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                )}>
                  {selectedReligions.map((r) => (
                    <Card key={r.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">{r.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {r.rituals.slice(0, 4).map((ritual, i) => (
                            <li key={i} className="text-sm">
                              <span className="font-medium">{ritual.name}</span>
                              <Badge variant="outline" className="text-xs ml-2">{ritual.occasion}</Badge>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Tribes Following */}
              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Tribes Following
                </h2>
                <div className={cn(
                  "grid gap-4",
                  selectedReligions.length === 1 && "grid-cols-1",
                  selectedReligions.length === 2 && "grid-cols-1 md:grid-cols-2",
                  selectedReligions.length === 3 && "grid-cols-1 md:grid-cols-3",
                  selectedReligions.length === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                )}>
                  {selectedReligions.map((r) => (
                    <Card key={r.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">{r.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {r.tribesFollowing.slice(0, 4).map((t, i) => (
                            <Link 
                              key={i}
                              to={`/learn/${t.tribeSlug}`}
                              className="flex items-center justify-between text-sm hover:text-primary transition-colors"
                            >
                              <span>{t.tribeName}</span>
                              <Badge variant="outline">{t.percentage}%</Badge>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
