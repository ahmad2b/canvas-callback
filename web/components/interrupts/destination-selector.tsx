"use client";

import { Command, Interrupt } from "@langchain/langgraph-sdk";
import { Search, X } from "lucide-react";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Add Leaflet type declarations
declare global {
	interface Window {
		L: any;
	}
}

export interface DestinationSelectorProps {
	interrupt: Interrupt;
	onSubmit?: (command: Command) => void;
}

export function DestinationSelector({
	interrupt,
	onSubmit,
}: DestinationSelectorProps) {
	const [selectedLocation, setSelectedLocation] = useState<{
		lat: number;
		lng: number;
		display_name?: string;
	} | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const mapRef = useRef<any>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const markerRef = useRef<any>(null);
	const geocoderRef = useRef<any>(null);

	// Extract the question from interrupt data
	const data = (interrupt?.value as any)?.data || "No data available";

	useEffect(() => {
		if (mapContainerRef.current) {
			// Wait for Leaflet scripts to load
			if (typeof window !== "undefined" && window.L) {
				initializeMap();
			}
		}

		// Ensure map resizes correctly when displayed
		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, []);

	const initializeMap = () => {
		const L = window.L;
		if (!L) return; // Ensure Leaflet is loaded

		// Initialize map
		if (mapRef.current) return; // Avoid re-initializing

		// Create map with zoom controls in bottom-right
		mapRef.current = L.map(mapContainerRef.current, {
			zoomControl: false, // Disable default zoom control
		}).setView([20, 0], 2);

		// Add zoom control to bottom right
		L.control
			.zoom({
				position: "bottomright",
			})
			.addTo(mapRef.current);

		// Add OpenStreetMap tile layer
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(mapRef.current);

		// Check if geocoder is available
		if (typeof L.Control.Geocoder === "function") {
			// Initialize the geocoder with proper constructor
			geocoderRef.current = new L.Control.Geocoder({
				defaultMarkGeocode: false,
				position: "topleft",
				placeholder: "Search for a location...",
				errorMessage: "Nothing found.",
				showResultIcons: true,
				suggestMinLength: 3,
				suggestTimeout: 250,
			}).addTo(mapRef.current);

			// Handle geocoder results
			geocoderRef.current.on(
				"markgeocode",
				(e: {
					geocode: { center: { lat: number; lng: number }; name: string };
				}) => {
					const { center, name } = e.geocode;
					setSelectedLocation({
						lat: center.lat,
						lng: center.lng,
						display_name: name,
					});

					// Set marker at the selected location
					if (markerRef.current) {
						// Remove from map if it's already there
						if (mapRef.current.hasLayer(markerRef.current)) {
							markerRef.current.setLatLng(center);
						} else {
							markerRef.current.setLatLng(center).addTo(mapRef.current);
						}

						// Update popup content
						markerRef.current.unbindPopup();
						markerRef.current
							.bindPopup(`<b>Selected Location:</b><br>${name}`)
							.openPopup();
					}

					// Fly to the location
					mapRef.current.flyTo(center, 13);
				}
			);
		} else {
			console.warn("Leaflet Geocoder plugin not available");
			// Continuing without the geocoder functionality
		}

		// Set up initial marker if needed - make it NOT draggable
		if (!markerRef.current) {
			// Create a custom icon for better visibility
			const customIcon = L.icon({
				iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowUrl:
					"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
				shadowSize: [41, 41],
			});

			// Add a marker at the current view center but don't show it yet
			markerRef.current = L.marker(mapRef.current.getCenter(), {
				draggable: false, // Remove dragging functionality
				icon: customIcon,
			});
		}

		// Handle map click events to set marker
		mapRef.current.on(
			"click",
			(e: { latlng: { lat: number; lng: number } }) => {
				const { lat, lng } = e.latlng;
				setSelectedLocation({
					lat,
					lng,
				});

				// Set marker at the clicked location
				if (markerRef.current) {
					// If marker is already on the map, just move it
					if (mapRef.current.hasLayer(markerRef.current)) {
						markerRef.current.setLatLng(e.latlng);
					} else {
						// If not, add it to the map
						markerRef.current.setLatLng(e.latlng).addTo(mapRef.current);
					}

					// Show loading popup while we get the location name
					markerRef.current.unbindPopup();
					markerRef.current
						.bindPopup("Loading location information...")
						.openPopup();

					// Add a highlight effect around the marker
					const highlightCircle = L.circle(e.latlng, {
						color: "rgba(66, 133, 244, 0.3)",
						fillColor: "rgba(66, 133, 244, 0.1)",
						fillOpacity: 0.5,
						radius: 200,
					}).addTo(mapRef.current);

					// Remove highlight after 2 seconds
					setTimeout(() => {
						if (mapRef.current.hasLayer(highlightCircle)) {
							mapRef.current.removeLayer(highlightCircle);
						}
					}, 2000);
				}

				// Center map on the selected location with appropriate zoom
				mapRef.current.setView(e.latlng, 15);

				// Reverse geocode to get location name
				fetch(
					`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
				)
					.then((response) => response.json())
					.then((data) => {
						setSelectedLocation((prev) => ({
							...prev!,
							display_name: data.display_name,
						}));

						// Update popup with location name
						if (markerRef.current && data.display_name) {
							markerRef.current.unbindPopup();
							markerRef.current
								.bindPopup(`<b>Selected Location:</b><br>${data.display_name}`)
								.openPopup();
						}
					})
					.catch((error) => console.error("Error:", error));
			}
		);

		// Make sure the map renders correctly
		setTimeout(() => {
			mapRef.current.invalidateSize();
		}, 100);
	};

	const handleMapSearch = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!searchQuery.trim()) return;

		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
					searchQuery
				)}&limit=5`
			);
			const data = await response.json();
			setSearchResults(data);
			setShowSearchResults(true);
		} catch (error) {
			console.error("Error searching for location:", error);
		}
	};

	const selectSearchResult = (result: any) => {
		const L = window.L;
		const latlng = [parseFloat(result.lat), parseFloat(result.lon)];

		setSelectedLocation({
			lat: parseFloat(result.lat),
			lng: parseFloat(result.lon),
			display_name: result.display_name,
		});

		// Set marker at the selected location
		if (markerRef.current) {
			// If marker is already on the map, just move it
			if (mapRef.current.hasLayer(markerRef.current)) {
				markerRef.current.setLatLng(latlng);
			} else {
				// If not, add it to the map
				markerRef.current.setLatLng(latlng).addTo(mapRef.current);
			}

			// Add popup to the marker
			markerRef.current.unbindPopup();
			markerRef.current
				.bindPopup(`<b>Selected Location:</b><br>${result.display_name}`)
				.openPopup();

			// Add a highlight effect around the marker
			const highlightCircle = L.circle(latlng, {
				color: "rgba(66, 133, 244, 0.3)",
				fillColor: "rgba(66, 133, 244, 0.1)",
				fillOpacity: 0.5,
				radius: 200,
			}).addTo(mapRef.current);

			// Remove highlight after 2 seconds
			setTimeout(() => {
				if (mapRef.current.hasLayer(highlightCircle)) {
					mapRef.current.removeLayer(highlightCircle);
				}
			}, 2000);
		}

		// Fly to the location with a smooth animation
		mapRef.current.flyTo(latlng, 15, {
			duration: 1.5,
			easeLinearity: 0.25,
		});

		// Clear search
		setSearchQuery("");
		setShowSearchResults(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (selectedLocation) {
			const locationString =
				selectedLocation.display_name ||
				`Latitude: ${selectedLocation.lat}, Longitude: ${selectedLocation.lng}`;

			if (onSubmit) {
				const payload: Command = {
					goto: undefined,
					resume: {
						destination: locationString,
					},
					update: {},
				};
				onSubmit(payload);
			}
		}
	};

	return (
		<>
			{/* Load Leaflet CSS and JS */}
			<Script
				src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
				integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
				crossOrigin=""
				onLoad={() => {
					console.log("Leaflet loaded");
					setTimeout(initializeMap, 100); // Slight delay to ensure initialization
				}}
			/>
			<Script
				src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"
				onLoad={() => {
					console.log("Geocoder loaded");
					// If map already initialized, try to add geocoder later
					if (mapRef.current && window.L && window.L.Control.Geocoder) {
						try {
							const geocoder = new window.L.Control.Geocoder({
								defaultMarkGeocode: false,
								position: "topleft",
								placeholder: "Search for a location...",
								errorMessage: "Nothing found.",
								showResultIcons: true,
								suggestMinLength: 3,
								suggestTimeout: 250,
							}).addTo(mapRef.current);
							geocoderRef.current = geocoder;
							console.log("Geocoder added after map init");
						} catch (e) {
							console.error("Failed to add geocoder after load:", e);
						}
					}
				}}
			/>
			<link
				rel="stylesheet"
				href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
				integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
				crossOrigin=""
			/>
			<link
				rel="stylesheet"
				href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"
			/>

			<div className="w-full h-full">
				<div className="relative w-full h-full flex flex-col">
					{/* Left sidebar with all controls */}
					<div className="absolute top-4 left-4 z-10 w-80">
						<div className="bg-white/70 backdrop-blur dark:bg-gray-800/70 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
							<h3 className="text-lg font-medium mb-2">{data}</h3>
							<p className="text-sm text-muted-foreground mb-4">
								Search for a location, or click directly on the map to select
								your destination
							</p>

							{/* Search form */}
							<form
								onSubmit={handleMapSearch}
								className="relative mb-4"
							>
								<Input
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search for a location..."
									className="pr-10"
								/>
								<button
									type="submit"
									className="absolute right-2 top-1/2 transform -translate-y-1/2"
								>
									<Search className="h-4 w-4 text-gray-500" />
								</button>
							</form>

							{/* Search results */}
							{showSearchResults && searchResults.length > 0 && (
								<div className="mt-1 w-full bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg z-20 max-h-60 overflow-y-auto mb-4">
									<div className="flex justify-between p-2 border-b">
										<span className="text-sm font-medium">Search Results</span>
										<button onClick={() => setShowSearchResults(false)}>
											<X className="h-4 w-4" />
										</button>
									</div>
									<ul>
										{searchResults.map((result, index) => (
											<li
												key={index}
												className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
												onClick={() => selectSearchResult(result)}
											>
												{result.display_name}
											</li>
										))}
									</ul>
								</div>
							)}

							{/* Selected location display - now below search */}
							{selectedLocation && (
								<div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-4 border border-gray-200 dark:border-gray-600">
									<p className="text-sm font-medium mb-1">Selected Location:</p>
									<p className="text-xs break-words max-h-24 overflow-y-auto">
										{selectedLocation.display_name ||
											`Latitude: ${selectedLocation.lat.toFixed(
												6
											)}, Longitude: ${selectedLocation.lng.toFixed(6)}`}
									</p>
									{selectedLocation.display_name && (
										<p className="text-xs mt-2 text-gray-500">
											Coordinates: {selectedLocation.lat.toFixed(6)},{" "}
											{selectedLocation.lng.toFixed(6)}
										</p>
									)}
								</div>
							)}

							{/* Confirm Button - now below location display */}
							<Button
								type="button"
								onClick={handleSubmit}
								disabled={!selectedLocation}
								size={"sm"}
								className={`w-full`}
							>
								{selectedLocation
									? "Confirm This Location"
									: "Select a Location"}
							</Button>
						</div>
					</div>

					{/* Map Container */}
					<div
						ref={mapContainerRef}
						className="w-full h-full z-0 flex-grow"
						style={{ minHeight: "calc(100vh - 150px)" }}
					></div>
				</div>
			</div>
		</>
	);
}
