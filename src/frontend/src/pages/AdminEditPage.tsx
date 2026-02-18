import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import { useNakshatraByName } from '../hooks/useQueries';
import { useUpdateNakshatra } from '../hooks/useNakshatraMutations';
import NakshatraImageUpload from '../components/NakshatraImageUpload';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Nakshatra } from '../backend';

export default function AdminEditPage() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const nakshatraName = id as string;
  
  const { data: nakshatra, isLoading, error } = useNakshatraByName(nakshatraName);
  const updateMutation = useUpdateNakshatra();

  const [formData, setFormData] = useState<Nakshatra>({
    name: '',
    imageUrl: '',
    description: '',
    rulingDeity: '',
    symbol: '',
    characteristics: '',
  });

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
      await updateMutation.mutateAsync(formData);
      toast.success('Nakshatra updated successfully!');
      navigate({ to: '/admin' });
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update Nakshatra');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center py-16">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Nakshatra data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
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
        <div className="max-w-3xl mx-auto text-center py-16">
          <p className="text-muted-foreground mb-4">Nakshatra "{nakshatraName}" not found</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/admin">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit {formData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <NakshatraImageUpload
                currentImageUrl={formData.imageUrl}
                onImageChange={(url) => {
                  setFormData({ ...formData, imageUrl: url });
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
                  placeholder="e.g., Energetic, pioneering, and adventurous"
                  rows={3}
                  required
                />
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
