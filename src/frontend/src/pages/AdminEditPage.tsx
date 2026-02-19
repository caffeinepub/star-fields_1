import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import { useNakshatraByName, useGetNakshatraImage } from '../hooks/useQueries';
import { useUpdateNakshatra } from '../hooks/useNakshatraMutations';
import NakshatraImageUpload from '../components/NakshatraImageUpload';
import AdminLogoutButton from '../components/AdminLogoutButton';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Nakshatra } from '../backend';

export default function AdminEditPage() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const nakshatraName = id as string;
  
  const { data: nakshatra, isLoading, error } = useNakshatraByName(nakshatraName);
  const { data: currentImageUrl, isLoading: imageLoading } = useGetNakshatraImage(nakshatra?.imageId);
  const updateMutation = useUpdateNakshatra();

  const [formData, setFormData] = useState<Nakshatra>({
    name: '',
    imageId: undefined,
    description: '',
    rulingDeity: '',
    symbol: '',
    characteristics: '',
    lunarClimate: '',
    karmicLesson: '',
    pada1: { title: '', description: '' },
    pada2: { title: '', description: '' },
    pada3: { title: '', description: '' },
    pada4: { title: '', description: '' },
  });

  const [imageData, setImageData] = useState<Uint8Array | null>(null);
  const [imageError, setImageError] = useState<string>('');

  useEffect(() => {
    if (nakshatra) {
      setFormData(nakshatra);
    }
  }, [nakshatra]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim() || !formData.rulingDeity.trim() || 
        !formData.symbol.trim() || !formData.characteristics.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        nakshatra: formData,
        imageData: imageData,
      });
      toast.success('Nakshatra updated successfully!');
      navigate({ to: '/admin' });
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update Nakshatra');
    }
  };

  const updatePadaField = (padaNum: 1 | 2 | 3 | 4, field: 'title' | 'description', value: string) => {
    setFormData({
      ...formData,
      [`pada${padaNum}`]: {
        ...formData[`pada${padaNum}`],
        [field]: value,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-end mb-4">
            <AdminLogoutButton />
          </div>
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading Nakshatra data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-end mb-4">
            <AdminLogoutButton />
          </div>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load Nakshatra: {error instanceof Error ? error.message : 'Unknown error'}
            </AlertDescription>
          </Alert>
          <Link to="/admin">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!nakshatra) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-end mb-4">
            <AdminLogoutButton />
          </div>
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Nakshatra "{nakshatraName}" not found</p>
            <Link to="/admin">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/admin">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <AdminLogoutButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit {formData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label>Current Image</Label>
                {imageLoading ? (
                  <Skeleton className="aspect-[4/5] w-full max-w-sm rounded-lg" />
                ) : currentImageUrl ? (
                  <div className="aspect-[4/5] w-full max-w-sm rounded-lg overflow-hidden border border-border">
                    <img
                      src={currentImageUrl}
                      alt={`Current ${formData.name} image`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No image uploaded yet</p>
                )}
              </div>

              <Separator />

              <NakshatraImageUpload
                currentImageUrl={currentImageUrl || undefined}
                onImageChange={(data) => {
                  setImageData(data);
                  setImageError('');
                }}
                onError={setImageError}
              />
              
              {imageError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{imageError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="rulingDeity">Ruling Deity *</Label>
                <Input
                  id="rulingDeity"
                  value={formData.rulingDeity}
                  onChange={(e) => setFormData({ ...formData, rulingDeity: e.target.value })}
                  placeholder="e.g., Ashwini Kumaras"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol *</Label>
                <Input
                  id="symbol"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  placeholder="e.g., Horse's head"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter a detailed description of this Nakshatra..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="characteristics">Characteristics *</Label>
                <Textarea
                  id="characteristics"
                  value={formData.characteristics}
                  onChange={(e) => setFormData({ ...formData, characteristics: e.target.value })}
                  placeholder="Enter key characteristics..."
                  rows={3}
                  required
                />
              </div>

              <Separator className="my-8" />

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Lunar Climate Today</h3>
                <p className="text-sm text-muted-foreground">
                  Define the atmospheric quality and karmic lesson for this Nakshatra's daily transit.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="lunarClimate">Lunar Climate Description</Label>
                  <Textarea
                    id="lunarClimate"
                    value={formData.lunarClimate}
                    onChange={(e) => setFormData({ ...formData, lunarClimate: e.target.value })}
                    placeholder="e.g., fast, instinctive, catalytic momentum"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Describe the emotional and energetic atmosphere when the Moon transits this Nakshatra.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="karmicLesson">Karmic Lesson</Label>
                  <Textarea
                    id="karmicLesson"
                    value={formData.karmicLesson}
                    onChange={(e) => setFormData({ ...formData, karmicLesson: e.target.value })}
                    placeholder="e.g., Act with courage but remember sustainability"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    The wisdom or teaching associated with this Nakshatra's energy.
                  </p>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Pada Information</h3>
                <p className="text-sm text-muted-foreground">
                  Customize the pada descriptions for this Nakshatra. Leave blank to use default content.
                </p>

                {[1, 2, 3, 4].map((padaNum) => {
                  const padaKey = `pada${padaNum}` as 'pada1' | 'pada2' | 'pada3' | 'pada4';
                  return (
                    <Card key={padaNum} className="bg-accent/5">
                      <CardHeader>
                        <CardTitle className="text-base">Pada {padaNum}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`pada${padaNum}-title`}>Title</Label>
                          <Input
                            id={`pada${padaNum}-title`}
                            value={formData[padaKey].title}
                            onChange={(e) => updatePadaField(padaNum as 1 | 2 | 3 | 4, 'title', e.target.value)}
                            placeholder={`e.g., Initiatory Fire`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`pada${padaNum}-description`}>Description</Label>
                          <Textarea
                            id={`pada${padaNum}-description`}
                            value={formData[padaKey].description}
                            onChange={(e) => updatePadaField(padaNum as 1 | 2 | 3 | 4, 'description', e.target.value)}
                            placeholder={`Enter detailed description for Pada ${padaNum}...`}
                            rows={6}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="flex-1"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Link to="/admin">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
